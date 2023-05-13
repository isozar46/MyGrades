const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOptions = {
    discriminatorKey: "user",
    timestamps: true
};

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['student', 'teacher', 'department_head', 'admin'],
            required: true
        },
        department: {
            type: String,
            enum: ['TRONC_COMMUN', 'IFA', 'TLSI'],
            required: true
        },
    },
    userOptions
);

const User = mongoose.model('User', userSchema);

module.exports = User;