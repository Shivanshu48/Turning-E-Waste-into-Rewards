const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpStore = {};  // { email: { otp, expiresAt } }

// Send OTP - expires in 5 minutes
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min

  otpStore[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rohangupta112005@gmail.com',   // Your Gmail here
      pass: 'caoz ufsw ynvq eptr'            // Your app password here
    }
  });

  const mailOptions = {
    from: 'rohangupta112005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };

  try {
    console.log(`Sending OTP ${otp} to ${email}`);
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ success: false, message: 'No OTP sent to this email' });
  }

  const { otp: savedOtp, expiresAt } = otpStore[email];

  if (Date.now() > expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  if (savedOtp == otp) {
    delete otpStore[email];
    return res.json({ success: true, message: 'OTP Verified' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// Register user
app.post('/register', (req, res) => {
  const { name, mobile, city, email } = req.body;

  if (!name || !mobile || !city  || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    // File might not exist yet, ignore
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  users.push({ name, mobile, city, email, registeredAt: new Date() });

  try {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ success: false, message: 'Failed to save user' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  let users = [];
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    // ignore if no users.json yet
  }

  const userExists = users.find(u => u.email === email);

  if (!userExists) {
    return res.status(400).json({ success: false, message: 'Email not registered' });
  }

  // Generate and send OTP (reuse your send OTP logic)
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rohangupta112005@gmail.com',
      pass: 'caoz ufsw ynvq eptr'
    }
  });

  const mailOptions = {
    from: 'rohangupta112005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };

  transporter.sendMail(mailOptions)
    .then(() => {
      console.log(`Login OTP ${otp} sent to ${email}`);
      res.json({ success: true, message: 'OTP sent' });
    })
    .catch((error) => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    });
});


// Route to check if email is already registered
app.post('/check-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const exists = users.some(user => user.email === email);

  res.json({ exists });
});
