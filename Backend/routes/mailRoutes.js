//backend/routes/mailRoutes.js
import express from 'express';
import { sendEmail, getReceivedEmails, starEmail, getStaredMessages, unstarEmail, getSentEmails, moveToTrash, trashMessagesList, untrashEmail, deleteEmailFromTrash, } from '../controller/mail.js'; 

const router = express.Router();

router
    .post("/send", sendEmail)
    .get("/receivebox/:usermail", getReceivedEmails)
    .post("/star", starEmail)
    .delete("/star/:emailId", unstarEmail)
    .get("/starbox/:usermail", getStaredMessages)
    .get("/sentbox/:usermail", getSentEmails)
    .post("/trash", moveToTrash)
    .get("/trashbox/:usermail", trashMessagesList)
    .post("/untrash", untrashEmail)
    .delete("/trash/:emailId", deleteEmailFromTrash)

export const mailRoutes = router;
