require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    // If you need explicit credentials for local dev:
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = {
    cognito,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_APP_CLIENT_ID,
};
