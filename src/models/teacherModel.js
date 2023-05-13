const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./userModel");

const teacherSchema = new Schema(
    {
        courses: [
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                },
                course_types: [
                    {
                        type: String,
                        enum: ['TD', 'TP', 'LECTURE'],
                        required: true
                    }
                ]
            }
        ]
    }
);

const Teacher = User.discriminator('Teacher', teacherSchema);

module.exports = Teacher;