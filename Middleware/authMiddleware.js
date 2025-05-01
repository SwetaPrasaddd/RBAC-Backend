const jwt = require('jsonwebtoken');
const User = require('../Models/users');

// const protect = async (req, res, next) => {


//     try {
//         let token = req.headers.authorization?.split(' ')[1];

//         if (!token) return res.status(401).json({ message: 'Not authorized' });
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.id).select('-password');

//         next();
//     } catch (error) {
//         console.log(error.message);

//         return res.status(401).json({ message: 'Token failed' });
//     }
// };

// module.exports = { protect };

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        console.log(decoded.id);

        console.log(decoded);

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Protect middleware error:', error.message);
        return res.status(401).json({ message: 'Token failed' });
    }
};

module.exports = { protect };
