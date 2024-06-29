const express = require('express');
const router = express.Router();
const db = require('../connection/db'); // Assuming db.js exports the MySQL connection pool

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

router.post('/track', (req, res) => {
    const { username, email, password } = req.body;

    // Basic input validation (ensure username, email, and password are provided)
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }

    const referralCode = generateReferralCode();
    const referral_link = `https://taa.com/ref/${referralCode}`;

    // SQL query with placeholders for parameterized query
    const sql = 'INSERT INTO users (username, email, password, referralCode, referral_link) VALUES (?, ?, ?, ?, ?)';

    // Array containing the values to be inserted
    const values = [username, email, password, referralCode, referral_link];

    // Execute the SQL query with parameterized values to prevent SQL injection
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error tracking referral:", err);
            return res.status(500).json({ success: false, message: "Failed to track referral" });
        }

        console.log("Referral tracked successfully");
        res.json({ success: true, message: "Referral tracked successfully" });
    });
});

module.exports = router;
