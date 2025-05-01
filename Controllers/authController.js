const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendVerificationMail = require('../utils/sendVerificationMail'); // We'll create this
const { log } = require('console');


// const signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//     });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(201).json({ message: "Sign up successful", user: user });
// };

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log("Cyp" + verificationToken);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false
    });

    console.log(user);
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    sendVerificationMail(email, name, verifyUrl);

    res.status(201).json({ message: "Signup successful. Please verify your email." });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    console.log(user);

    if (!user.isVerified) {
        return res.status(403).json({ message: "Email not verified. Please check your inbox." });
    }

    if (user.block) {
        return res.status(403).json({ message: "You have been Blocked, Can't login !" })
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
        { id: user._id, role: user.role },    // include role also if needed
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        message: "Login successful",
        token: token,   // <-- sending the token
        user: user,
        role: user.role
    });
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, photo, gender } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, photo, gender },
            { new: true }
        );

        res.json({ message: 'Profile updated', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getUsers = async (req, res) => {
    try {
        // Fetch only users with role 'user', exclude password
        const users = await User.find({ role: 'user' }, '-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
};

// const verifyEmail = async (req, res) => {
//     try {
//         const { token } = req.params;

//         const user = await User.findOne({ verificationToken: token });

//         if (!user) return res.status(400).json({ message: "Invalid or expired verification token." });

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         await user.save();

//         res.status(200).json({ message: "Email verified successfully. You can now log in." });
//     }
//     catch (err) {
//         res.status(400).json({ message: "Email is not verified!, Please check email to verify" });

//     }
// };

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        console.log("Received token:", token);

        const user = await User.findOne({ verificationToken: token });
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token." });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: "Email already verified. You can now log in." });
        }


        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ message: "Something went wrong during email verification." });
    }
};

const blockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const blockUser = req?.body.block;
        const user = await User.findByIdAndUpdate(
            userId,
            { block: blockUser },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            message: `User ${user.name} has been blocked.`,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { signup, login, updateProfile, getUsers, verifyEmail, blockUser };
