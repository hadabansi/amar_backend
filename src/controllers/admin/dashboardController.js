const dashboardService = require('../../services/admin/dashboardService');
const constants = require('../../constant');

/**
 * Get dashboard statistics
 * @route GET /admin/dashboard/stats
 * @access Private
 */
exports.getDashboardStats = async (req, res, next) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DATA_FETCHED_SUCCESSFULLY,
            stats
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get recent activity
 * @route GET /admin/dashboard/activity
 * @access Private
 */
exports.getRecentActivity = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const activity = await dashboardService.getRecentActivity(limit);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DATA_FETCHED_SUCCESSFULLY,
            activity
        );
    } catch (error) {
        next(error);
    }
};

