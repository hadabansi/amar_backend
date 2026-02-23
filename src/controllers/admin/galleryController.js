const galleryService = require('../../services/admin/galleryService');
const constants = require('../../constant');
const { emitToFrontend } = require('../../utils/socketEmitter');

/**
 * Get all galleries
 * @route GET /admin/galleries
 * @access Private
 */
exports.getGalleries = async (req, res, next) => {
    try {
        const galleries = await galleryService.getGalleries(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERIES_FETCHED_SUCCESS,
            galleries
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single gallery
 * @route GET /admin/galleries/:id
 * @access Private
 */
exports.getGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.getGalleryById(req.params.id);
        
        if (!gallery) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.GALLERY_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERY_FETCHED_SUCCESS,
            gallery
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Create gallery
 * @route POST /admin/galleries
 * @access Private
 */
exports.createGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.createGallery(req, res, next);
        
        // Notify frontend to refresh galleries
        emitToFrontend('gallery_updated', { action: 'create', gallery });
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.GALLERY_CREATED_SUCCESS,
            gallery
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update gallery
 * @route PUT /admin/galleries/:id
 * @access Private
 */
exports.updateGallery = async (req, res, next) => {
    try {
        const gallery = await galleryService.updateGallery(req, res, next, req.params.id);
        
        if (!gallery) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.GALLERY_NOT_FOUND
            );
        }
        
        // Notify frontend to refresh galleries
        emitToFrontend('gallery_updated', { action: 'update', gallery });
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERY_UPDATED_SUCCESS,
            gallery
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Delete gallery
 * @route DELETE /admin/galleries/:id
 * @access Private
 */
exports.deleteGallery = async (req, res, next) => {
    try {
        const result = await galleryService.deleteGallery(req.params.id);
        
        if (!result) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.GALLERY_NOT_FOUND
            );
        }
        
        // Notify frontend to refresh galleries
        emitToFrontend('gallery_updated', { action: 'delete', id: req.params.id });
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.GALLERY_DELETED_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

