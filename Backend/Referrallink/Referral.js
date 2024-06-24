const express = require('express');
const router = express.Router();
const db = require("../connection/db")

// GET request handler
router.get('/generate', (req, res) => {
    const referralCode = generateReferralCode();
    const referralLink = `https://taa.com/ref/${referralCode}`;

    // Insert referral data into MySQL
    const sql = 'INSERT INTO users (referralCode, referral_link) VALUES (?, ?)';
    db.query(sql, [referralCode, referralLink], (err, result) => {
        if (err) throw err;
        console.log('Referral data inserted into MySQL');
        res.json({ referralLink });
    });
});

// POST request handler to process referral code
router.post('/postReferral', (req, res) => {
    const { referralCode } = req.body;

    // Insert referral data into MySQL
    const sql = 'INSERT INTO users (referralCode) VALUES (?)';
    db.query(sql, [referralCode], (err, result) => {
        if (err) {
            console.error('Error inserting referral code into MySQL:', err);
            res.status(500).json({ message: 'Failed to process referral code' });
            return;
        }
        console.log('Referral code inserted into MySQL:', referralCode);
        const responseMessage = `Referral code ${referralCode} processed successfully.`;
        res.json({ message: responseMessage });
    });
});

function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8);

}
module.exports = router;
