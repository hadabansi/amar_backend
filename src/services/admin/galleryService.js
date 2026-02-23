const { Gallery, Photo } = require('../../models');
const { uploadImage, deleteImage } = require('../../config/cloudinary');
const uploadDir = require('../../constant/uploadDir');
const fs = require('fs');

/**
 * Get all galleries with filters
 */
exports.getGalleries = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.featured !== undefined) {
        where.featured = filters.featured === 'true';
    }
    if (filters.category) {
        where.category = filters.category;
    }

    return await Gallery.findAll({
        where,
        include: [{
            model: Photo,
            as: 'images',
            where: { isDeleted: false },
            required: false,
        }],
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single gallery by ID
 */
exports.getGalleryById = async (id) => {
    return await Gallery.findOne({
        where: { id, isDeleted: false },
        include: [{
            model: Photo,
            as: 'images',
            where: { isDeleted: false },
            required: false,
        }],
    });
};

/**
 * Create new gallery
 */
exports.createGallery = async (req, res, next) => {
    const { title, description, category, coverImageUrl, featured } = req.body;

    let finalImageUrl = coverImageUrl;
    
    // Handle file upload - save to local folder (BeamMe style)
    // Support both images and videos for gallery covers
    const allowedTypes = [
        "jpeg", "jpg", "png", "gif", "webp",  // Images
        "mp4", "mpeg", "quicktime", "x-msvideo", "x-matroska", "webm"  // Videos
    ];
    const uploadedFile = await upload_file(req, res, next, "coverImage", uploadDir.uploadDir.GALLERY_COVERS_DIR, allowedTypes);
    
    if (uploadedFile) {
        // File saved successfully to local folder
        finalImageUrl = `uploads/${uploadDir.uploadDir.GALLERY_COVERS_DIR}/${uploadedFile}`;
    }
    // If no file but coverImageUrl provided (URL string), use it
    else if (coverImageUrl) {
        finalImageUrl = coverImageUrl;
    }

    const gallery = await Gallery.create({
        title,
        description,
        category,
        coverImageUrl: finalImageUrl,
        coverImagePublicId: null,
        featured: featured === 'true' || featured === true,
    });

    return gallery;
};

/**
 * Update gallery
 */
exports.updateGallery = async (req, res, next, id) => {
    const gallery = await Gallery.findOne({ where: { id, isDeleted: false } });
    
    if (!gallery) {
        return null;
    }

    const { coverImageUrl, ...otherFields } = req.body;
    
    // Handle file upload - save to local folder (BeamMe style)
    // Support both images and videos for gallery covers
    const allowedTypes = [
        "jpeg", "jpg", "png", "gif", "webp",  // Images
        "mp4", "mpeg", "quicktime", "x-msvideo", "x-matroska", "webm"  // Videos
    ];
    const uploadedFile = await upload_file(req, res, next, "coverImage", uploadDir.uploadDir.GALLERY_COVERS_DIR, allowedTypes);
    
    if (uploadedFile) {
        // Delete old image file if exists
        if (gallery.coverImageUrl && gallery.coverImageUrl.startsWith('uploads/')) {
            await delete_file(`./${gallery.coverImageUrl}`);
        }
        
        // File saved successfully to local folder
        otherFields.coverImageUrl = `uploads/${uploadDir.uploadDir.GALLERY_COVERS_DIR}/${uploadedFile}`;
        otherFields.coverImagePublicId = null;
    }
    // If no file but coverImageUrl provided (URL string), use it
    else if (coverImageUrl) {
        otherFields.coverImageUrl = coverImageUrl;
    }

    // Convert string booleans to actual booleans
    if (otherFields.featured !== undefined) {
        otherFields.featured = otherFields.featured === 'true' || otherFields.featured === true;
    }

    await gallery.update(otherFields);
    return gallery;
};

/**
 * Delete gallery
 */
exports.deleteGallery = async (id) => {
    const gallery = await Gallery.findOne({ where: { id, isDeleted: false } });
    
    if (!gallery) {
        return null;
    }

    // Delete cover image file if exists in local folder
    if (gallery.coverImageUrl && gallery.coverImageUrl.startsWith('uploads/')) {
        await delete_file(`./${gallery.coverImageUrl}`);
    }

    // Delete all photos in the gallery
    const photos = await Photo.findAll({ where: { galleryId: id, isDeleted: false } });
    for (const photo of photos) {
        // Delete photo file if exists in local folder
        if (photo.imageUrl && photo.imageUrl.startsWith('uploads/')) {
            await delete_file(`./${photo.imageUrl}`);
        }
        await photo.update({ isDeleted: true });
    }

    // Soft delete gallery
    await gallery.update({ isDeleted: true });
    return true;
};
