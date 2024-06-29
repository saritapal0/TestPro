const express = require('express');
const router = express.Router();
const db = require('../connection/db'); // Assuming db.js exports the MySQL connection pool

// Function to generate a random referral code
function generateReferralCode() {
    // Implement your referral code generation logic here
    // Example: Generate a random 6-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < 6; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
}

router.post('/track', (req, res) => {
    const { username, email, password, parentCode } = req.body;

    // Basic input validation
    if (!username || !email || !password || !parentCode) {
        return res.status(400).json({ success: false, message: "All fields (username, email, password, parentCode) are required" });
    }

    const referralCode = generateReferralCode();
    const referral_link = `https://taa.com/ref/${referralCode}`;

    // SQL query with placeholders for parameterized query
    const sql = 'INSERT INTO users (username, email, password, parentCode, referralCode, referral_link) VALUES (?, ?, ?, ?, ?, ?)';

    // Array containing the values to be inserted
    const values = [username, email, password, parentCode, referralCode, referral_link];

    // Execute the SQL query with parameterized values to prevent SQL injection
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error tracking referral:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: "User with this email or username already exists" });
            }
            return res.status(500).json({ success: false, message: "Failed to track referral" });
        }

        console.log("Referral tracked successfully");
        res.json({ success: true, message: "Referral tracked successfully" });
    });
});

module.exports = router;
