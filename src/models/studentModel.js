const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courses: [{
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        },
        grade: Number
    }],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;