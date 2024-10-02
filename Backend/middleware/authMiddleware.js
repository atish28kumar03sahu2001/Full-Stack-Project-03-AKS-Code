//backend/middleware/authMiddleware.js
export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers

    if (!token) {
        return next(); // No token, proceed to next middleware
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token. Please sign in.' });
        }
        
        // If valid token, the user is logged in
        req.userId = decoded.id; // Attach user id to the request
        return res.status(403).json({ message: 'User already logged in. Redirecting to profile.' });
    });
};