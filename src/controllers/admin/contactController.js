const contactService = require('../../services/admin/contactService');
const constants = require('../../constant');

/**
 * Get all contacts
 * @route GET /admin/contacts
 * @access Private
 */
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await contactService.getContacts(req.query);
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.CONTACTS_FETCHED_SUCCESS,
            contacts
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get single contact
 * @route GET /admin/contacts/:id
 * @access Private
 */
exports.getContact = async (req, res, next) => {
    try {
        const contact = await contactService.getContactById(req.params.id);
        
        if (!contact) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.CONTACT_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.CONTACT_FETCHED_SUCCESS,
            contact
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update contact
 * @route PUT /admin/contacts/:id
 * @access Private
 */
exports.updateContact = async (req, res, next) => {
    try {
        const contact = await contactService.updateContact(req.params.id, req.body);
        
        if (!contact) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.CONTACT_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.CONTACT_UPDATED_SUCCESS,
            contact
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Mark contact as read
 * @route PUT /admin/contacts/:id/read
 * @access Private
 */
exports.markAsRead = async (req, res, next) => {
    try {
        const contact = await contactService.markAsRead(req.params.id);
        
        if (!contact) {
            return generateResponse(
                req,
                res,
                StatusCodes.NOT_FOUND,
                false,
                constants.apiResponse.CONTACT_NOT_FOUND
            );
        }
        
        return generateResponse(
            req,
            res,
            StatusCodes.OK,
            true,
            constants.apiResponse.CONTACT_UPDATED_SUCCESS,
            contact
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get contact statistics
 * @route GET /admin/contacts/stats
 * @access Private
 */
exports.getContactStats = async (req, res, next) => {
    try {
        const stats = await contactService.getContactStats();
        
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

