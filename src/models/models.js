const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'departmentHead'],
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: false,
    },
});
  
// Course Schema
const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    academicLevel: {
        type: String,
        enum: ['L1', 'L2', 'L3', 'L1', 'M2'],
        required: true,
    },
    semester: {
        type: Number,
        enum: [1, 2],
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: false,
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    }],
});
  
// Department Schema
const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    head: {
        type: Schema.Types.ObjectId,
        ref: 'DepartmentHead',
    },
});
  
// Student Schema
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
  
// Teacher Schema
const teacherSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courses: [{
        course: { 
            type: Schema.Types.ObjectId, 
            ref: 'Course', 
            required: true 
        }
    }],
});
  
// Department Head Schema
const departmentHeadSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Export the models
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Department = mongoose.model('Department', departmentSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const DepartmentHead = mongoose.model('DepartmentHead', departmentHeadSchema);

  
module.exports = {
    User, 
    Course, 
    Department, 
    Student, 
    Teacher, 
    DepartmentHead
};
