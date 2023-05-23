const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Course = require('../models/courseModel');
const Grade = require('../models/gradeModel');

exports.addGrade = async (req, res) => {
    const { user } = req; // Get the authenticated user
    try {
        const teacher = await Teacher.findOne({ user: user._id });
        const { studentId, courseId, gradeType, value } = req.body;

        // Check if the teacher teaches the given course
        const courseTaught = teacher.courses.find(course => course.course.toString() === courseId);
        if (!courseTaught) {
            return res.status(403).json({ error: 'Teacher is not assigned to this course' });
        }

        // Check if the student is taking the given course
        const student = await Student.findById(studentId).populate('specialty');
        const specialtyCourses = student.specialty.courses.map(course => course.course.toString());
        if (!specialtyCourses.includes(courseId)) {
            return res.status(403).json({ error: 'Student is not enrolled in this course' });
        }

        // Create a new grade
        const grade = new Grade({
            student: studentId,
            course: courseId,
            grade_type: gradeType,
            value: value
        });

        await grade.save();

        return res.status(201).json({ grade });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getGrades = async (req, res) => {
    const { user } = req; // Get the authenticated user

    try {
        let filter = {};

        if (user.role === 'student') {
            // Student user: Return only their own grades
            filter.student = user.userId;

            const { courseId } = req.query;
            if (courseId) {
                filter.course = courseId;
            }
        }
        if (user.role === 'teacher') {
            // Teacher user: Return grades of courses they teach
            const teacher = await Teacher.findOne({ user: user._id });

            const courseIds = teacher.courses.map(course => course.course);
            filter.course = { $in: courseIds };

            const { courseId } = req.query;
            if (courseId && courseIds.includes(courseId)) {
                filter.course = courseId;
            }
        }
        if (user.role === 'department_head') {
            // Department Head user: Return grades related to their department
            const departmentHead = await User.DepartmentHead.findOne({ user: user._id });

            const specialty = await Specialty.findOne({ department: departmentHead.department });
            const courseIds = specialty.courses.map(course => course.course);
            filter.course = { $in: courseIds };

            const { courseId } = req.query;
            if (courseId && courseIds.includes(courseId)) {
                filter.course = courseId;
            }
        }
        if (user.role === 'admin') {
            // Admin user: Return all grades
            const { courseId } = req.query;
            if (courseId) {
                filter.course = courseId;
            }
        }

        // Fetch the grades based on the filter
        const grades = await Grade.find(filter);

        res.status(200).json({ grades });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

}