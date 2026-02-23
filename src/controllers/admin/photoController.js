const photoService = require('../../services/admin/photoService');
const constants = require('../../constant');
const { emitToFrontend } = require('../../utils/socketEmitter');

/**
 * Get all photos
 * @route GET /admin/photos
 * @access Private
 */
exports.getPhotos = async (req, res, next) => {
    try {
        const photos = await photoService.getPhotos(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.PHOTOS_FETCHED_SUCCESS,
            photos
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Upload photo
 * @route POST /admin/photos
 * @access Private
 */
exports.createPhoto = async (req, res, next) => {
    try {
        const photo = await photoService.createPhoto(req, res, next);
        
        // Notify frontend to refresh galleries
        emitToFrontend('photo_updated', { action: 'create', photo });
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.PHOTO_UPLOADED_SUCCESS,
            photo
        );
    } catch (error) {
        if (error.message === 'Gallery not found') {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.GALLERY_NOT_FOUND
            );
        }
        next(error);
    }
};

/**
 * Delete photo
 * @route DELETE /admin/photos/:id
 * @access Private
 */
exports.deletePhoto = async (req, res, next) => {
    try {
        const result = await photoService.deletePhoto(req.params.id);
        
        if (!result) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.PHOTO_NOT_FOUND
            );
        }
        
        // Notify frontend to refresh galleries
        emitToFrontend('photo_updated', { action: 'delete', id: req.params.id });
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.PHOTO_DELETED_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

