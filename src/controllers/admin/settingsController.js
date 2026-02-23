const settingsService = require('../../services/admin/settingsService');
const constants = require('../../constant');

/**
 * Get settings
 * @route GET /admin/settings
 * @access Private
 */
exports.getSettings = async (req, res, next) => {
    try {
        const settings = await settingsService.getSettings();
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SETTINGS_FETCHED_SUCCESS,
            settings
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update settings
 * @route PUT /admin/settings
 * @access Private
 */
exports.updateSettings = async (req, res, next) => {
    try {
        const settings = await settingsService.updateSettings(req.body);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SETTINGS_UPDATED_SUCCESS,
            settings
        );
    } catch (error) {
        next(error);
    }
};

