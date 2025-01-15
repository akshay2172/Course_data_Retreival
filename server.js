const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const http = require('http');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const validator = require('validator');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 2000;

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('data'))



const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    otp: String, // Added field to store OTP
    isVerified: { type: Boolean, default: false } ,
    resetPasswordToken: String,
    resetPasswordExpires: Date                                     
});

const User = mongoose.model('User', userSchema);

function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: 'openheimer122@gmail.com',
        pass:'laim ezbw pltf aysi',
    } ,

    tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate error
    }

});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {

       
        const hashedpassword = await bcrypt.hash(password, 10);
        const otp = generateRandomFourDigitNumber().toString();
     
      
        const user = new User({ name, email, password: hashedpassword , otp });
      
       

        const mailOptions = {
            from: 'openheimer122@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Your One Time Password (OTP) is ${otp}`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error); // Log detailed error
                return res.status(500).json({ error: 'Error sending OTP' });
            }
            await user.save();
            res.status(200).json({ message: 'User created, Please verify your email.', userId: user._id });
        });

    } catch (error) {
        res.status(500).json({ error: 'Error creating the user' });
    }
});

app.post('/verify-otp', async (req, res) => {
    const { userId, otp } = req.body;
    try {
        const user = await User.findById(userId);
        if (user && user.otp === otp) {
            user.isVerified = true;
            user.otp = '';
            await user.save();

         res.status(200).json("email verified successfully")
        
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error verifying OTP' });
    }
});

app.post('/signin', async (req, res) => { 
    const { email, password } = req.body;
    try {
        const find = await User.findOne({ email });
        if (!find) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (!find.isVerified) {
            return res.status(401).json({ error: 'Email not verified' });
        }
        const valid = await bcrypt.compare(password, find.password);
        if (!valid) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: find._id }, 'your_jwt_secret');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with that email' });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();
      
       
        

        const mailOptions = {
            from: 'www.akshaykumar04855@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending OTP email' });
            }
            res.status(200).json({ message: 'OTP sent to your email' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error processing password reset request' });
    }

app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, otp, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = '';
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });  //error checking
    }
});


// Add this to serve the forgot-password HTML page

mongoose.connect(
    "mongodb+srv://wwwakshaykumar04855:W7SiPexgRtcMIrLZ@cluster0.ncsoz.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("connected to database");

    server.listen(port, '0.0.0.0', () => {
        console.log(`server is running on port http://172.23.145.77:${port}`);
    });
}).catch(() => {
    console.log("unable to connect");
});