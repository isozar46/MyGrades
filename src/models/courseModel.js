const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        coefficient: {
            type: Number,
            required: true
        },
        credit: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
    }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
