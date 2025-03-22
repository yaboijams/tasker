const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const router = express.Router();

// Pull in environment variables
const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
} = process.env;

// Scopes for what data you want to access
const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-modify-public",
    // add more scopes if needed
].join(" ");

// 1) Login Route: Redirects to Spotify for authorization
router.get("/login", (req, res) => {
    const queryParams = querystring.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: SCOPES,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        // optional: state parameter for security
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// 2) Callback Route: Handles the code, exchanges for tokens
router.get("/callback", async (req, res) => {
    const code = req.query.code || null;
    const error = req.query.error || null;

    if (error) {
        return res.status(400).send(`Spotify authorization error: ${error}`);
    }

    if (!code) {
        return res.status(400).send("No authorization code provided.");
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await axios({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            data: querystring.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
                        "base64"
                    ),
            },
        });

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        // Here, you can store tokens in your database or session
        // For example, if you have a user session:
        // req.session.spotifyAccessToken = access_token;
        // req.session.spotifyRefreshToken = refresh_token;

        // For now, let's just return them in the response
        return res.json({
            access_token,
            refresh_token,
            expires_in,
        });
    } catch (err) {
        console.error("Error exchanging code for tokens:", err.message);
        return res
            .status(500)
            .send("An error occurred while trying to authenticate with Spotify.");
    }
});

module.exports = router;
