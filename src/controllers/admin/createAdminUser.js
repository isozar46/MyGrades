const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

// Create a new admin user
const createAdminUser = async () => {
    try {
        const password = '200120032012';

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin user document
        const adminUser = new User({
            email: 'admin@admin.com',
            password: hashedPassword,
            role: 'admin'
        });

        // Save the admin user document
        await adminUser.save({ validateBeforeSave: false });
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

module.exports = createAdminUser;