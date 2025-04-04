const { cognito, clientId } = require("../config/cognito");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const result = await cognito.signUp(params).promise();
    // User is sent a verification code by Cognito
    return res.json({ message: "Sign-up successful", result });
  } catch (error) {
    console.error("Sign-up error:", error);
    return res.status(400).json({ error: error.message });
  }
};

exports.confirmSignUp = async (req, res) => {
  const { email, code } = req.body;
  const params = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: code,
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    return res.json({ message: "Verification successful", result });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(400).json({ error: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH", // or "USER_SRP_AUTH" if enabled
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    const { IdToken } = result.AuthenticationResult;

    // Decode the IdToken to extract the Cognito user's unique ID (sub) and email
    const decoded = jwt.decode(IdToken);
    const cognitoSub = decoded.sub;
    const userEmail = decoded.email;

    // Check if user already exists in MongoDB; if not, create a new document
    let user = await User.findOne({ cognitoSub });
    if (!user) {
      user = new User({
        cognitoSub,
        email: userEmail,
      });
      await user.save();
    }

    return res.json({
      message: "Sign-in successful",
      tokens: result.AuthenticationResult,
      user,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(400).json({ error: error.message });
  }
};
