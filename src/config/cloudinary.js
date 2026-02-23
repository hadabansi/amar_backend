const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file, folder = 'amar-studio') => {
    try {
        let uploadSource = file;
        
        // If file is a buffer (from multer), convert to base64
        if (Buffer.isBuffer(file)) {
            const base64 = file.toString('base64');
            const mimeType = 'image/jpeg'; // Default, should be detected from file
            uploadSource = `data:${mimeType};base64,${base64}`;
        }
        
        const result = await cloudinary.uploader.upload(uploadSource, {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { width: 1920, height: 1080, crop: 'limit' },
                { quality: 'auto:good' },
                { fetch_format: 'auto' },
            ],
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Image upload failed');
    }
};

const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return false;
    }
};

module.exports = {
    cloudinary,
    uploadImage,
    deleteImage,
};

