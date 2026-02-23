const { verifyToken } = require('../utils/jwtToken');
const User = require('../models/User');
const constants = require('../constant');

module.exports = async function (req, res, next) {
    let token = null;
    
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        
        if (parts.length === 2) {
            const [scheme, credentials] = parts;

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            } else {
                return generateResponse(
                    req, 
                    res, 
                    StatusCodes.UNAUTHORIZED, 
                    false, 
                    constants.apiResponse.FORMAT_BEARER_TOKEN
                );
            }
        } else {
            return generateResponse(
                req, 
                res, 
                StatusCodes.UNAUTHORIZED, 
                false, 
                constants.apiResponse.FORMAT_BEARER_TOKEN
            );
        }
    } else {
        return generateResponse(
            req, 
            res, 
            StatusCodes.UNAUTHORIZED, 
            false, 
            constants.apiResponse.FORMAT_BEARER_TOKEN
        );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
        return generateResponse(
            req, 
            res, 
            StatusCodes.UNAUTHORIZED, 
            false, 
            constants.apiResponse.TOKEN_EXPIRED
        );
    }

    try {
        // Find user by id (Sequelize)
        const user = await User.findOne({ 
            where: { id: decoded.id, isDeleted: false },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return generateResponse(
                req, 
                res, 
                StatusCodes.UNAUTHORIZED, 
                false, 
                constants.apiResponse.TOKEN_MISMATCH
            );
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return generateResponse(
                req, 
                res, 
                StatusCodes.FORBIDDEN, 
                false, 
                constants.apiResponse.ADMIN_ACCESS_REQUIRED
            );
        }

        req.loggedInUser = user;
        req.token = decoded;
        
        return next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return generateResponse(
            req, 
            res, 
            StatusCodes.INTERNAL_SERVER_ERROR, 
            false, 
            constants.apiResponse.SOMETHING_WENT_WRONG
        );
    }
};

