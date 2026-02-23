const { Category } = require('../../models');

/**
 * Get all categories
 */
exports.getCategories = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.isActive !== undefined) {
        where.isActive = filters.isActive === 'true';
    }

    return await Category.findAll({
        where,
        order: [['name', 'ASC']],
    });
};

/**
 * Get single category by ID
 */
exports.getCategoryById = async (id) => {
    return await Category.findOne({
        where: { id, isDeleted: false },
    });
};

/**
 * Create new category
 */
exports.createCategory = async (data) => {
    const { name, description, icon } = data;

    // Check if category with same name exists
    const existing = await Category.findOne({ 
        where: { name, isDeleted: false } 
    });
    
    if (existing) {
        throw new Error('Category with this name already exists');
    }

    const category = await Category.create({
        name,
        description,
        icon: icon || '📸',
        isActive: true,
    });

    return category;
};

/**
 * Update category
 */
exports.updateCategory = async (id, data) => {
    const category = await Category.findOne({ 
        where: { id, isDeleted: false } 
    });
    
    if (!category) {
        return null;
    }

    // If name is being updated, check for duplicates
    if (data.name && data.name !== category.name) {
        const existing = await Category.findOne({ 
            where: { name: data.name, isDeleted: false } 
        });
        
        if (existing) {
            throw new Error('Category with this name already exists');
        }
    }

    await category.update(data);
    return category;
};

/**
 * Delete category
 */
exports.deleteCategory = async (id) => {
    const category = await Category.findOne({ 
        where: { id, isDeleted: false } 
    });
    
    if (!category) {
        return null;
    }

    // Soft delete
    await category.update({ isDeleted: true, isActive: false });
    return true;
};

/**
 * Toggle category active status
 */
exports.toggleCategoryStatus = async (id) => {
    const category = await Category.findOne({ 
        where: { id, isDeleted: false } 
    });
    
    if (!category) {
        return null;
    }
    
    await category.update({ isActive: !category.isActive });
    return category;
};

