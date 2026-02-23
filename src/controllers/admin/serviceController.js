const serviceService = require('../../services/admin/serviceService');
const constants = require('../../constant');

/**
 * Get all services
 * @route GET /admin/services
 */
exports.getServices = async (req, res, next) => {
    try {
        const services = await serviceService.getServices(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICES_FETCHED_SUCCESS,
            services
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get service by ID
 * @route GET /admin/services/:id
 */
exports.getService = async (req, res, next) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        
        if (!service) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.SERVICE_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICE_FETCHED_SUCCESS,
            service
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Create service
 * @route POST /admin/services
 */
exports.createService = async (req, res, next) => {
    try {
        const service = await serviceService.createService(req.body);
        
        return generateResponse(
            req,
            res,
            StatusCodes.CREATED,
            true,
            constants.apiResponse.SERVICE_CREATED_SUCCESS,
            service
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update service
 * @route PUT /admin/services/:id
 */
exports.updateService = async (req, res, next) => {
    try {
        const service = await serviceService.updateService(req.params.id, req.body);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICE_UPDATED_SUCCESS,
            service
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Toggle service status
 * @route PATCH /admin/services/:id/toggle
 */
exports.toggleStatus = async (req, res, next) => {
    try {
        const service = await serviceService.toggleStatus(req.params.id);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICE_UPDATED_SUCCESS,
            service
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Delete service
 * @route DELETE /admin/services/:id
 */
exports.deleteService = async (req, res, next) => {
    try {
        await serviceService.deleteService(req.params.id);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICE_DELETED_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update display order
 * @route PATCH /admin/services/:id/order
 */
exports.updateDisplayOrder = async (req, res, next) => {
    try {
        const service = await serviceService.updateDisplayOrder(
            req.params.id,
            req.body.displayOrder
        );
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.SERVICE_UPDATED_SUCCESS,
            service
        );
    } catch (error) {
        next(error);
    }
};


