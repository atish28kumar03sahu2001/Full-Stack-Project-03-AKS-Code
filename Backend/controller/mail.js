//backend/controller/mail.js
import { Users } from "../models/index.js";
export const sendEmail = async (req, res) => {
    console.log(req.body);
    const { sender, receiver, subject, message } = req.body;

    try {
        const senderUser = await Users.findOne({ usermail: sender });
        if (senderUser) {
            senderUser.sentbox.push({ sender, receiver, subject, message });
            await senderUser.save();
        } else {
            console.log('Sender not found:', sender);
        }
        const receiverUser = await Users.findOne({ usermail: receiver });
        if (receiverUser) {
            receiverUser.receivebox.push({ sender, receiver, subject, message });
            await receiverUser.save();
        } else {
            console.log('Receiver not found:', receiver);
        }

        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error saving email:', error);
        return res.status(500).json({ message: 'Error sending email', error });
    }
};

export const getReceivedEmails = async (req, res) => {
    const { usermail } = req.params;

    try {
        const user = await Users.findOne({ usermail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        return res.status(200).json(user.receivebox);
    } catch (error) {
        console.error('Error fetching emails:', error);
        return res.status(500).json({ message: 'Error fetching emails', error });
    }
};

export const starEmail = async (req, res) => {
    const { usermail, email } = req.body;

    try {
        const user = await Users.findOne({ usermail });
        if (user) {
            user.star.push(email);
            await user.save();
            return res.status(200).json({ message: 'Email starred successfully!' });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error starring email', error });
    }
};

export const getStaredMessages = async (req, res) => {
    const { usermail } = req.params;
    try {
        const user = await Users.findOne({ usermail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user.star);
    } catch (error) {
        console.error('Error fetching starred emails:', error);
        return res.status(500).json({ message: 'Error fetching starred emails', error });
    }
}

export const unstarEmail = async (req, res) => {
    const { usermail } = req.body;
    const { emailId } = req.params;

    try {
        const user = await Users.findOne({ usermail });
        if (user) {
            user.star = user.star.filter(starredEmail => starredEmail._id.toString() !== emailId);
            await user.save();
            return res.status(200).json({ message: 'Email unstarred successfully!' });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error unstarring email', error });
    }
};

export const getSentEmails = async (req, res) => {
    const { usermail } = req.params;

    try {
        const user = await Users.findOne({ usermail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        return res.status(200).json(user.sentbox);
    } catch (error) {
        console.error('Error fetching sent emails:', error);
        return res.status(500).json({ message: 'Error fetching sent emails', error });
    }
};

export const moveToTrash = async (req, res) => {
    const { usermail, emailId } = req.body;

    try {
        const user = await Users.findOne({ usermail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const emailToMove = user.receivebox.find(email => email._id.toString() === emailId);
        if (!emailToMove) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isStarred = user.star.find(starredEmail => starredEmail._id.toString() === emailId);
        if (isStarred) {
            user.star = user.star.filter(starredEmail => starredEmail._id.toString() !== emailId);
        }

        user.trash.push(emailToMove);
        user.receivebox = user.receivebox.filter(email => email._id.toString() !== emailId);

        await user.save();

        return res.status(200).json({ message: 'Email moved to trash successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error moving email to trash', error });
    }
};

export const trashMessagesList = async (req, res) => {
    const { usermail } = req.params;
    try {
      const user = await Users.findOne({ usermail });
      if (user) {
        res.status(200).json(user.trash);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
} 

export const untrashEmail = async (req, res) => {
    const { usermail, emailId } = req.body;

    try {
        const user = await Users.findOne({ usermail });
        
        if (!user || !Array.isArray(user.trash)) {
            return res.status(404).json({ message: "Trash not found" });
        }
        const trashedEmail = user.trash.find(email => email._id.toString() === emailId);

        if (!trashedEmail) {
            return res.status(404).json({ message: "Email not found in trash" });
        }
        user.receivebox.push(trashedEmail);
    
        user.trash = user.trash.filter(email => email._id.toString() !== emailId);
        await user.save();

        return res.status(200).json(trashedEmail);
    } catch (error) {
        console.error("Error untrashing email:", error);
        return res.status(500).json({ message: "Error untrashing email", error });
    }
};

export const deleteEmailFromTrash = async (req, res) => {
    const { usermail } = req.body;
    const { emailId } = req.params;

    try {
        const user = await Users.findOne({ usermail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const emailIndex = user.trash.findIndex(email => email._id.toString() === emailId);
        if (emailIndex === -1) {
            return res.status(404).json({ message: "Email not found in trash" });
        }
        user.trash.splice(emailIndex, 1);
        await user.save();

        return res.status(200).json({ message: "Email deleted from trash successfully!" });
    } catch (error) {
        console.error("Error deleting email from trash:", error);
        return res.status(500).json({ message: "Error deleting email from trash", error });
    }
};
