const express = require('express');
const router = express.Router();
const db = require('../connection/db'); // Your MySQL connection pool

// Function to generate a random alphanumeric referral code
function generateReferralCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
}

// POST endpoint for user registration
// POST endpoint for user registration
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }

    // Generate referral code and link
    const referralCode = generateReferralCode();
    const referral_link = `http://example.com/ref/${referralCode}`;

    // SQL query to insert user into database
    const sql = 'INSERT INTO users (username, email, password, referralCode, referral_link) VALUES (?, ?, ?, ?, ?)';
    const values = [username, email, password, referralCode, referral_link];

    // Execute query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ success: false, message: "Failed to register user" });
        }

        // Track referral link (server-side)
        trackReferralLink(referralCode);

        // Registration successful, send referral link to frontend
        res.json({ success: true, referral_link });
    });
});

// Function to track referral link (server-side)
function trackReferralLink(referralCode) {
    // Example: Logging or sending data to analytics service
    console.log(`Referral link tracked successfully: http://example.com/ref/${referralCode}`);
    // You can implement further actions like sending data to an analytics service or logging this activity.
}


module.exports = router;
