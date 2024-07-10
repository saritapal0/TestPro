const express = require('express');
const router = express.Router();
const db = require("../connection/db")

// GET request handler
router.get('/generate', (req, res) => {
    const referralCode = generateReferralCode();
    const referralLink = `http://localhost:5173/ref/${referralCode}`;
    const { username, email, password} = req.body;

    // Insert referral data into MySQL
    const sql = 'INSERT INTO users ( username, email, password,referralCode, referral_link) VALUES (?,?,?,?,?)';
    db.query(sql, [  username, email, password, referralCode, referralLink ], (err, result) => {
        if (err) throw err;
        console.log('Referral data inserted into MySQL');
        res.json({ referralLink });
    });
});


function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8);

}
module.exports = router;
