const express = require('express');
const router = express.Router();


router.get('/generate', (req, res) => {
    const referralCode = generateReferralCode();
    const referralLink = `https://taa.com/ref/${referralCode}`;
    res.json({ referralLink });
});

function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8);
}

module.exports = router;
