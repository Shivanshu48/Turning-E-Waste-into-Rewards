const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpStore = {}; // In-memory OTP store: { email: { otp, expiresAt } }

const usersFile = path.join(__dirname, 'users.json');
const pickupsFile = path.join(__dirname, 'pickups.json');

// Utility to read JSON file safely
function readJsonFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return [];
}

// Utility to write JSON file safely
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
    return false;
  }
}

// Nodemailer transporter (reuse for all emails)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rohangupta112005@gmail.com',
    pass: 'caoz ufsw ynvq eptr' // Your app password here
  }
});

// -------- OTP Endpoints --------

// Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore[email] = { otp, expiresAt };

  const mailOptions = {
    from: 'rohangupta112005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP ${otp} sent to ${email}`);
    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ success: false, message: 'No OTP sent to this email' });

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  if (parseInt(otp, 10) === record.otp) {
    delete otpStore[email];
    return res.json({ success: true, message: 'OTP Verified' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// -------- User Registration --------
app.post('/register', (req, res) => {
  const { name, mobile, city, email } = req.body;
  if (!name || !mobile || !city || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const users = readJsonFile(usersFile);

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  users.push({ name, mobile, city, email, registeredAt: new Date().toISOString() });

  if (!writeJsonFile(usersFile, users)) {
    return res.status(500).json({ success: false, message: 'Failed to save user' });
  }

  return res.json({ success: true, message: 'Registration successful' });
});

// -------- Login --------
app.post('/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const users = readJsonFile(usersFile);
  if (!users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email not registered' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expiresAt };

  const mailOptions = {
    from: 'rohangupta112005@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Login OTP ${otp} sent to ${email}`);
    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// -------- Check Email --------
app.post('/check-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const users = readJsonFile(usersFile);
  const exists = users.some(user => user.email === email);

  res.json({ exists });
});

// -------- Schedule Pickup --------
app.post('/schedule-pickup', (req, res) => {
  console.log('Received schedule-pickup request:', req.body);
  const { name, phone, address, date, time, items, email } = req.body;
  if (!name || !phone || !address || !date || !time || !items || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const pickups = readJsonFile(pickupsFile);
  pickups.push({
    name,
    phone,
    address,
    date,
    time,
    items,
    email,
    scheduledAt: new Date().toISOString()
  });

  if (!writeJsonFile(pickupsFile, pickups)) {
    return res.status(500).json({ success: false, message: 'Failed to save pickup' });
  }

  const mailOptions = {
    from: 'rohangupta112005@gmail.com',
    to: email,
    subject: 'Pickup Scheduled - E-Waste Recycling',
    text: `Hello ${name},

Thank you for scheduling your e-waste pickup.

Details:
- Phone: ${phone}
- Address: ${address}
- Preferred Date: ${date}
- Preferred Time: ${time}
- Items: ${items}

Pickup fee: ₹199 (additional charges may apply)

Thank you,
Team EcoRewards`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending pickup confirmation email:', error);
      return res.status(500).json({ success: false, message: 'Pickup scheduled but failed to send confirmation email.' });
    }
    return res.json({ success: true, message: `Pickup scheduled! Confirmation sent to ${email}.` });
  });
});

// -------- Start Server --------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
