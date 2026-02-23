const authService = require('../../services/user/authService');
const constants = require('../../constant');

/**
 * Admin login
 * @route POST /admin/login
 * @access Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const result = await authService.login(email, password);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.ADMIN_LOGIN_SUCCESS,
            result
        );
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return generateResponse(
                req,
                res,
                StatusCodes.UNAUTHORIZED,
                false,
                constants.apiResponse.INVALID_CREDENTIALS
            );
        }
        next(error);
    }
};

/**
 * Verify admin token
 * @route GET /admin/verify
 * @access Private
 */
exports.verifyToken = async (req, res, next) => {
    try {
        // req.loggedInUser is the Sequelize model instance
        const userId = req.loggedInUser.id || req.loggedInUser._id;
        const user = await authService.verifyToken(userId);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SUCCESS,
            { user }
        );
    } catch (error) {
        console.error('Verify token error:', error);
        next(error);
    }
};

