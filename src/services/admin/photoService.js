const { Photo, Gallery } = require('../../models');
const { uploadImage, deleteImage } = require('../../config/cloudinary');
const uploadDir = require('../../constant/uploadDir');

/**
 * Get all photos with filters
 */
exports.getPhotos = async (filters = {}) => {
    const where = { isDeleted: false };
    
    if (filters.galleryId) {
        where.galleryId = filters.galleryId;
    }

    return await Photo.findAll({
        where,
        include: [{
            model: Gallery,
            as: 'gallery',
            attributes: ['id', 'title', 'category'],
        }],
        order: [['createdAt', 'DESC']],
    });
};

/**
 * Get single photo by ID
 */
exports.getPhotoById = async (id) => {
    return await Photo.findOne({
        where: { id, isDeleted: false },
        include: [{
            model: Gallery,
            as: 'gallery',
        }],
    });
};

/**
 * Upload new photo
 */
exports.createPhoto = async (req, res, next) => {
    const { title, description, imageUrl, galleryId } = req.body;

    // Check if gallery exists
    const gallery = await Gallery.findOne({ where: { id: galleryId, isDeleted: false } });
    if (!gallery) {
        throw new Error('Gallery not found');
    }

    let finalImageUrl = imageUrl;
    
    // Handle file upload - save to local folder (BeamMe style)
    // Support both images and videos
    const allowedTypes = [
        "jpeg", "jpg", "png", "gif", "webp",  // Images
        "mp4", "mpeg", "quicktime", "x-msvideo", "x-matroska", "webm"  // Videos
    ];
    const uploadedFile = await upload_file(req, res, next, "image", uploadDir.uploadDir.PHOTOS_DIR, allowedTypes);
    
    if (uploadedFile) {
        // File saved successfully to local folder
        finalImageUrl = `uploads/${uploadDir.uploadDir.PHOTOS_DIR}/${uploadedFile}`;
    }
    // If no file but imageUrl provided (URL string), use it
    else if (imageUrl) {
        finalImageUrl = imageUrl;
    }

    const photo = await Photo.create({
        title,
        description,
        imageUrl: finalImageUrl,
        imagePublicId: null,
        imageWidth: null,
        imageHeight: null,
        galleryId: parseInt(galleryId),
    });

    // Return with gallery data
    return await Photo.findOne({
        where: { id: photo.id },
        include: [{
            model: Gallery,
            as: 'gallery',
            attributes: ['id', 'title', 'category'],
        }],
    });
};

/**
 * Delete photo
 */
exports.deletePhoto = async (id) => {
    const photo = await Photo.findOne({ where: { id, isDeleted: false } });
    
    if (!photo) {
        return null;
    }

    // Delete image file if exists in local folder
    if (photo.imageUrl && photo.imageUrl.startsWith('uploads/')) {
        await delete_file(`./${photo.imageUrl}`);
    }

    // Soft delete photo
    await photo.update({ isDeleted: true });
    return true;
};
