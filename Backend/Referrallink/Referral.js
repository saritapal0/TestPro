const express = require('express');
const router = express.Router();

// GET request handler
router.get('/generate', (req, res) => {
    const referralCode = generateReferralCode();
    const referralLink = `https://taa.com/ref/${referralCode}`;
    res.json({ referralLink });
});

// POST request handler
router.post('/postReferral', (req, res) => {
    const { referralCode } = req.body;
    const responseMessage = `Referral code ${referralCode} processed successfully.`;
    res.json({ message: responseMessage });
});

function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8);
}

module.exports = router;
