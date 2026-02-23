const { Contact } = require('../../models');

/**
 * Get all contacts with filters
 */
exports.getContacts = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.read !== undefined) {
        where.read = filters.read === 'true';
    }

    return await Contact.findAll({
        where,
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single contact by ID
 */
exports.getContactById = async (id) => {
    return await Contact.findOne({
        where: { id, isDeleted: false },
    });
};

/**
 * Update contact
 */
exports.updateContact = async (id, data) => {
    const contact = await Contact.findOne({ where: { id, isDeleted: false } });
    
    if (!contact) {
        return null;
    }

    await contact.update(data);
    return contact;
};

/**
 * Mark contact as read
 */
exports.markAsRead = async (id) => {
    const contact = await Contact.findOne({ where: { id, isDeleted: false } });
    
    if (!contact) {
        return null;
    }
    
    await contact.update({ read: true });
    return contact;
};

/**
 * Mark contact as unread
 */
exports.markAsUnread = async (id) => {
    const contact = await Contact.findOne({ where: { id, isDeleted: false } });
    
    if (!contact) {
        return null;
    }
    
    await contact.update({ read: false });
    return contact;
};

/**
 * Delete contact
 */
exports.deleteContact = async (id) => {
    const contact = await Contact.findOne({ where: { id, isDeleted: false } });
    
    if (!contact) {
        return null;
    }

    await contact.update({ isDeleted: true });
    return true;
};

/**
 * Get contact statistics
 */
exports.getContactStats = async () => {
    const total = await Contact.count({ where: { isDeleted: false } });
    const unread = await Contact.count({ where: { read: false, isDeleted: false } });
    const read = await Contact.count({ where: { read: true, isDeleted: false } });

    return {
        total,
        unread,
        read,
    };
};
