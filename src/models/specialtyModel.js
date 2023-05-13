const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialtySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        department: {
            type: String,
            enum: ['TRONC_COMMUN', 'IFA', 'TLSI'],
            required: true
        },
        courses: [
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }
);

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
