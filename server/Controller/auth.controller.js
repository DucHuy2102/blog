const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

import bcrypt from 'bcrypt';
import User from '../Schema/User.js';
import { nanoid } from 'nanoid';
import generateTokenAndSetCookie from '../utils/generateTokeAndSetCookie.js';

export const signupController = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message:
                'Password must be 6-20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter.',
        });
    }
    try {
        const normalizedEmail = email.toLowerCase();
        const existingEmail = await User.findOne({ 'personal_info.email': normalizedEmail });
        if (existingEmail) {
            return res
                .status(409)
                .json({ success: false, message: 'Email is already registered.' });
        }
        const username = email.split('@')[0];
        const existingUsername = await User.findOne({ 'personal_info.username': username });
        const finalUsername = existingUsername ? `${username}_${nanoid(5)}` : username;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            personal_info: {
                fullname,
                email: normalizedEmail,
                password: hashedPassword,
                username: finalUsername,
            },
        }).save();

        const { password: pass, ...rest } = newUser._doc;
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: rest,
        });
    } catch (error) {
        console.log('Error in signupController:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

export const signinController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    try {
        const user = await User.findOne({ 'personal_info.email': email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.personal_info.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        const { password: pass, ...rest } = user.personal_info;
        const userResponse = {
            _id: user._id,
            personal_info: rest,
            social_links: user.social_links,
            account_info: user.account_info,
            google_auth: user.google_auth,
            blogs: user.blogs,
        };
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            success: true,
            message: 'User signed in successfully.',
            user: userResponse,
        });
    } catch (error) {
        console.log('Error in signinController:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
