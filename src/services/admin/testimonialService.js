const { Testimonial } = require('../../models');
const { uploadImage, deleteImage } = require('../../config/cloudinary');
const uploadDir = require('../../constant/uploadDir');

/**
 * Get all testimonials with filters
 */
exports.getTestimonials = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.approved !== undefined) {
        where.approved = filters.approved === 'true';
    }

    return await Testimonial.findAll({
        where,
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single testimonial by ID
 */
exports.getTestimonialById = async (id) => {
    return await Testimonial.findOne({
        where: { id, isDeleted: false },
    });
};

/**
 * Create new testimonial
 */
exports.createTestimonial = async (req, res, next) => {
    const { name, role, content, rating, imageUrl, approved } = req.body;

    let finalImageUrl = imageUrl;
    
    // Handle file upload - save to local folder (BeamMe style)
    const allowedTypes = ["jpeg", "jpg", "png", "gif", "webp"];
    const uploadedFile = await upload_file(req, res, next, "image", uploadDir.uploadDir.TESTIMONIALS_DIR, allowedTypes);
    
    if (uploadedFile) {
        // File saved successfully to local folder
        finalImageUrl = `uploads/${uploadDir.uploadDir.TESTIMONIALS_DIR}/${uploadedFile}`;
    }
    // If no file but imageUrl provided (URL string), use it
    else if (imageUrl) {
        finalImageUrl = imageUrl;
    }

    const testimonial = await Testimonial.create({
        name,
        role,
        content,
        rating: parseInt(rating),
        imageUrl: finalImageUrl,
        imagePublicId: null,
        approved: approved === 'true' || approved === true,
    });

    return testimonial;
};

/**
 * Update testimonial
 */
exports.updateTestimonial = async (req, res, next, id) => {
    const testimonial = await Testimonial.findOne({ where: { id, isDeleted: false } });
    
    if (!testimonial) {
        return null;
    }

    const { imageUrl, ...otherFields } = req.body;
    
    // Handle file upload - save to local folder (BeamMe style)
    const allowedTypes = ["jpeg", "jpg", "png", "gif", "webp"];
    const uploadedFile = await upload_file(req, res, next, "image", uploadDir.uploadDir.TESTIMONIALS_DIR, allowedTypes);
    
    if (uploadedFile) {
        // Delete old image file if exists
        if (testimonial.imageUrl && testimonial.imageUrl.startsWith('uploads/')) {
            await delete_file(`./${testimonial.imageUrl}`);
        }
        
        // File saved successfully to local folder
        otherFields.imageUrl = `uploads/${uploadDir.uploadDir.TESTIMONIALS_DIR}/${uploadedFile}`;
        otherFields.imagePublicId = null;
    }
    // If no file but imageUrl provided, use it
    else if (imageUrl) {
        otherFields.imageUrl = imageUrl;
    }
    
    // Convert string booleans
    if (otherFields.approved !== undefined) {
        otherFields.approved = otherFields.approved === 'true' || otherFields.approved === true;
    }
    if (otherFields.rating !== undefined) {
        otherFields.rating = parseInt(otherFields.rating);
    }

    await testimonial.update(otherFields);
    return testimonial;
};

/**
 * Delete testimonial
 */
exports.deleteTestimonial = async (id) => {
    const testimonial = await Testimonial.findOne({ where: { id, isDeleted: false } });
    
    if (!testimonial) {
        return null;
    }

    // Delete image file if exists in local folder
    if (testimonial.imageUrl && testimonial.imageUrl.startsWith('uploads/')) {
        await delete_file(`./${testimonial.imageUrl}`);
    }

    // Soft delete
    await testimonial.update({ isDeleted: true });
    return true;
};

/**
 * Approve testimonial
 */
exports.approveTestimonial = async (id) => {
    const testimonial = await Testimonial.findOne({ where: { id, isDeleted: false } });
    
    if (!testimonial) {
        return null;
    }
    
    await testimonial.update({ approved: true });
    return testimonial;
};
