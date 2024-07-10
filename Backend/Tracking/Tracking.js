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

// Function to track referral link (server-side)
// function trackReferralLink(referralCode, referredUserId) {
//     const sql = 'INSERT INTO users (referralCode, referredUserId) VALUES (?, ?)';
//     const values = [referralCode, referredUserId];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error("Error tracking referral link:", err);
//         } else {
//             console.log(`Referral link tracked successfully:${referralCode}`);
//         }
//     });
// }

// POST endpoint for user registration
router.post('/register', (req, res) => {
    const { username, email, password, referralCode } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }
    const generatedReferralCode = referralCode || generateReferralCode();
    const referral_link = `http://localhost:5173/ref/${generatedReferralCode}`;


    const sql = 'INSERT INTO users (username, email, password, referralCode, referral_link) VALUES (?, ?, ?, ?, ?)';
    const values = [username, email, password, generatedReferralCode, referral_link];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ success: false, message: "Failed to register user" });
        }

        const referredUserId = result.insertId;

        trackReferralLink(generatedReferralCode, referredUserId);
        res.json({ success: true, referral_link });
    });
});

module.exports = router;
