const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema(
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
        grade_type: {
            type: String,
            enum: ['TP', 'TD', 'INTERO', 'CONTROL', 'CONTROL_RAT'],
            required: true
        },
        value: {
            type: Number,
            min: 0,
            max: 20,
            required: true
        }
    }
);

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
