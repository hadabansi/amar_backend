const { Service } = require('../../models');

/**
 * Get all services
 */
exports.getServices = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.isActive !== undefined) {
        where.isActive = filters.isActive === 'true';
    }

    return await Service.findAll({
        where,
        order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
    });
};

/**
 * Get service by ID
 */
exports.getServiceById = async (id) => {
    return await Service.findOne({
        where: { id, isDeleted: false },
    });
};

/**
 * Create service
 */
exports.createService = async (data) => {
    return await Service.create(data);
};

/**
 * Update service
 */
exports.updateService = async (id, data) => {
    const service = await Service.findOne({
        where: { id, isDeleted: false },
    });

    if (!service) {
        throw new Error('Service not found');
    }

    await service.update(data);
    return service;
};

/**
 * Toggle service status
 */
exports.toggleStatus = async (id) => {
    const service = await Service.findOne({
        where: { id, isDeleted: false },
    });

    if (!service) {
        throw new Error('Service not found');
    }

    await service.update({ isActive: !service.isActive });
    return service;
};

/**
 * Delete service (soft delete)
 */
exports.deleteService = async (id) => {
    const service = await Service.findOne({
        where: { id, isDeleted: false },
    });

    if (!service) {
        throw new Error('Service not found');
    }

    await service.update({ isDeleted: true });
    return service;
};

/**
 * Update display order
 */
exports.updateDisplayOrder = async (id, displayOrder) => {
    const service = await Service.findOne({
        where: { id, isDeleted: false },
    });

    if (!service) {
        throw new Error('Service not found');
    }

    await service.update({ displayOrder });
    return service;
};


