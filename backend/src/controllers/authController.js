const { cognito, clientId } = require("../config/cognito");

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
    return res.json({
      message: "Sign-in successful",
      tokens: result.AuthenticationResult,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(400).json({ error: error.message });
  }
};
