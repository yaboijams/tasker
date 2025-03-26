// src/config/Cognito.js
const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_pyLavmtaF", // Your Cognito user pool endpoint
    client_id: "29rccah87qs2cb4bv5ep34tgv7", // Your App Client ID
    redirect_uri: "http://localhost:3000/", // The URL where Cognito should redirect after sign in
    response_type: "code", // Authorization code flow
    scope: "openid profile email", // Scopes you want to request (adjust as needed)
};

export default cognitoAuthConfig;
