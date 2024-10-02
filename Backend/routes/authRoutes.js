//backend/routes/authRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { signup, signin, patchUser } from '../controller/auth.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('userimage');

router
    .post('/signup',authMiddleware, upload, signup)
    .post('/signin',authMiddleware, signin)
    .patch('/:id', upload, patchUser)
export const Authentication = router;