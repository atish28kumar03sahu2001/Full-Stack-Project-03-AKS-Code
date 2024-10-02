//backend/models/index.js
import mongoose from "mongoose";
const ReceiveSchema = new mongoose.Schema({
    sender: { type: String }, 
    receiver: { type: String }, 
    subject: { type: String }, 
    message: { type: String }, 
});

const SentSchema = new mongoose.Schema({
    sender: { type: String }, 
    receiver: { type: String }, 
    subject: { type: String }, 
    message: { type: String }, 
});
const StarSchema = new mongoose.Schema({
    sender: {type: String}, receiver: {type: String},subject: {type: String}, message: {type: String}, 
});
const TrashSchema = new mongoose.Schema({
    sender: {type: String}, receiver: {type: String},subject: {type: String}, message: {type: String}, 
});
const UserSchema = new mongoose.Schema({
    userimage: {type: Buffer},
    username: {type: String},
    usermail: {type: String},
    userpassword: {type: String},
    usertoken: {type: String},
    receivebox: [ReceiveSchema],
    sentbox: [SentSchema],
    star: [StarSchema],
    trash: [TrashSchema],
})

export const Users = mongoose.model('Users',UserSchema);