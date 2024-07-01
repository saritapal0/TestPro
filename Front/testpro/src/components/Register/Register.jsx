import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FullLayouts from '../../layouts/Fulllayouts';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [referralLink, setReferralLink] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const generateReferralLink = (userId) => {
    // Example of generating a referral link (you can customize this logic)
    return `http://example.com/referral/${userId}`;
  };

  const trackReferralLink = (link) => {
    console.log('Referral link tracked:', link);

    // Here you can implement further logic to send the referral link to analytics, save it locally, etc.
  };

  const handleRegister = () => {
    const isValid = validateForm();

    if (isValid) {
      fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const userId = data.userId; // Adjust based on your API response
          const link = generateReferralLink(userId);
          setReferralLink(link);
          setIsLoggedIn(true);

          // Track or log referral link here
          trackReferralLink(link);
        })
        .catch(error => {
          console.error('Error:', error);
          setError('Registration failed. Please try again.');
        });
    }
  };

  if (isLoggedIn) {
    return (
      <FullLayouts>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Registration Successful
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your referral link:
            <a href={referralLink} target="_blank" rel="noopener noreferrer">{referralLink}</a>
          </Typography>
        </Box>
      </FullLayouts>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, backgroundColor: '#82b1ff' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Register Form
          </Typography>
          <Box sx={{ '& > :not(style)': { marginBottom: 2 } }}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Register;
