const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const router = express.Router();

RegisterRoutes = require("./Registration/Register");
RefferalRoutes = require('./Referrallink/Referral');
TrackingRoutes = require('./Tracking/Tracking');
DasboardRoutes = require('./Dashboard/Dashboard')

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', RegisterRoutes);
app.use('/api/referral', RefferalRoutes);
app.use('/api/tracking', TrackingRoutes);
app.use('/api/users', DasboardRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
