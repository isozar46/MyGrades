const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        details : {
            type: String,
            required: true
        }
    }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;