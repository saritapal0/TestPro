const express = require('express');
const router = express.Router();
const db = require('../connection/db'); // Assuming db.js exports the MySQL connection pool

router.post('/track', (req, res) => {
    const {username, email, password, parentCode,referral_code } = req.body;

    // // Basic input validation
    // if (!referralCode) {
    //     return res.status(400).json({ success: false, message: "Referral code is required" });
    // }

    // Assuming you have a table named 'referrals' in your database
    const sql = 'INSERT INTO users (username, email, password, parentCode,referral_code) VALUES (?,?,?,?,?)';

    // Execute the SQL query with parameterized values to prevent SQL injection
    db.query(sql, [username, email, password, parentCode,referral_code], (err, result) => {
        if (err) {
            console.error("Error tracking referral:", err);
            return res.status(500).json({ success: false, message: "Failed to track referral" });
        }

        console.log("Referral tracked successfully");
        res.json({ success: true, message: "Referral tracked successfully" });
    });
});

module.exports = router;
