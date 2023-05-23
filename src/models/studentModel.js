const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./userModel");

const studentSchema = new Schema(
    {
        registration_number: {
            type: Number,
            required: true
        },
        section: {
            type: Number
        },
        group: {
            type: Number,
            required: true
        },
        academic_level: {
            type: String,
            enum: ['L1', 'L2', 'L3', 'M1', 'M2'],
            required: true
        },
        specialty: {
            type: Schema.Types.ObjectId,
            ref: 'Specialty',
            required: false
        },
    }
);
  
const Student = User.discriminator('Student', studentSchema);

module.exports = Student;