const categoryService = require('../../services/admin/categoryService');
const constants = require('../../constant');
const { emitToFrontend } = require('../../utils/socketEmitter');

/**
 * Get all categories
 * @route GET /admin/categories
 * @access Private
 */
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DATA_FETCHED_SUCCESSFULLY,
            categories
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single category
 * @route GET /admin/categories/:id
 * @access Private
 */
exports.getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        
        if (!category) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.NO_DATA_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DATA_FETCHED_SUCCESSFULLY,
            category
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Create category
 * @route POST /admin/categories
 * @access Private
 */
exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        
        // Notify frontend to refresh categories
        try {
            emitToFrontend('category_updated', { action: 'create', category });
        } catch (err) {
            console.log('Socket emission failed:', err.message);
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.CREATED_SUCCESS,
            category
        );
    } catch (error) {
        if (error.message === 'Category with this name already exists') {
            return generateResponse(
                req,
                res,
                StatusCodes.BAD_REQUEST,
                false,
                error.message
            );
        }
        next(error);
    }
};

/**
 * Update category
 * @route PUT /admin/categories/:id
 * @access Private
 */
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        
        if (!category) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.NO_DATA_FOUND
            );
        }
        
        // Notify frontend to refresh categories
        emitToFrontend('category_updated', { action: 'update', category });
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.UPDATED_SUCCESS,
            category
        );
    } catch (error) {
        if (error.message === 'Category with this name already exists') {
            return generateResponse(
                req,
                res,
                StatusCodes.BAD_REQUEST,
                false,
                error.message
            );
        }
        next(error);
    }
};

/**
 * Delete category
 * @route DELETE /admin/categories/:id
 * @access Private
 */
exports.deleteCategory = async (req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        
        if (!result) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.NO_DATA_FOUND
            );
        }
        
        // Notify frontend to refresh categories
        emitToFrontend('category_updated', { action: 'delete', id: req.params.id });
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.DELETED_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Toggle category status
 * @route PUT /admin/categories/:id/toggle
 * @access Private
 */
exports.toggleStatus = async (req, res, next) => {
    try {
        const category = await categoryService.toggleCategoryStatus(req.params.id);
        
        if (!category) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.NO_DATA_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.UPDATED_SUCCESS,
            category
        );
    } catch (error) {
        next(error);
    }
};

