const { User } = require('../../models');
const { generateToken } = require('../../utils/jwtToken');

/**
 * Login admin user
 */
exports.login = async (email, password) => {
    // Find user by email
    const user = await User.findOne({ where: { email, isDeleted: false } });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = user.getSignedJwtToken();

    // Update user's jwtToken
    await user.update({ jwtToken: token });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};

/**
 * Verify token and get user
 */
exports.verifyToken = async (userId) => {
    const user = await User.findOne({ 
        where: { id: userId, isDeleted: false },
        attributes: { exclude: ['password'] },
    });
    
    if (!user) {
        throw new Error('User not found');
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role,
    };
};

/**
 * Create new admin user
 */
exports.createUser = async (data) => {
    const { email, password, role } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const user = await User.create({
        email,
        password,
        role: role || 'admin',
    });

    return {
        id: user.id,
        email: user.email,
        role: user.role,
    };
};
