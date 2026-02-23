const nodemailer = require('nodemailer');
const { uploadImage, deleteImage } = require('../config/cloudinary');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const uploadDir = require('../constant/uploadDir');

/**
 * Generate standardized API response
 */
const generateResponse = (req, res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message: req.__? req.__(message) : message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Send email using Nodemailer
 */
const sendMail = async ({ to, subject, html, text }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Amar Digital Studio" <noreply@amarstudio.com>',
            to,
            subject,
            text,
            html,
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

// /**
//  * Upload file to Cloudinary
//  */
// const upload_file = async (file, folder = 'amar-studio') => {
//     try {
//         return await uploadImage(file, folder);
//     } catch (error) {
//         throw new Error('File upload failed');
//     }
// };

/**
 * Delete file from Cloudinary
 */
// const delete_file = async (publicId) => {
//     try {
//         return await deleteImage(publicId);
//     } catch (error) {
//         console.error('File deletion error:', error);
//         return false;
//     }
// };

/**
 * Send booking confirmation email
 */
const sendBookingConfirmation = async (booking, services = []) => {
    console.log('📧 Preparing booking confirmation email...');
    console.log('📦 Services available:', services.length);
    console.log('📋 Booking service field:', booking.service);
    
    // Format services array - convert IDs to names
    let serviceText = '';
    
    // Helper to get service name by ID
    const getServiceName = (id) => {
        if (!services || services.length === 0) {
            console.log('⚠️ No services found in array');
            return null;
        }
        
        console.log(`🔍 Looking for service ID: ${id}`);
        console.log('🔍 Available service IDs:', services.map(s => s.id));
        
        // Try different ID comparisons (handles both number and string IDs)
        const service = services.find(s => {
            const sId = s.id;
            const searchId = parseInt(id);
            return sId === searchId || sId === id || String(sId) === String(id);
        });
        
        if (service && service.title) {
            console.log(`✅ Found service: ${service.title} (ID: ${service.id})`);
            return service.title;
        }
        
        console.log(`⚠️ Service with ID ${id} not found`);
        return null;
    };
    
    if (typeof booking.service === 'string') {
        try {
            const serviceArray = JSON.parse(booking.service);
            if (Array.isArray(serviceArray)) {
                const serviceNames = serviceArray.map(id => {
                    const name = getServiceName(id);
                    return name || `Service ID: ${id}`;
                });
                serviceText = serviceNames.join(', ');
            } else {
                const name = getServiceName(serviceArray);
                serviceText = name || booking.service;
            }
        } catch {
            const name = getServiceName(booking.service);
            serviceText = name || booking.service;
        }
    } else if (Array.isArray(booking.service)) {
        const serviceNames = booking.service.map(id => {
            const name = getServiceName(id);
            return name || `Service ID: ${id}`;
        });
        serviceText = serviceNames.join(', ');
    } else {
        const name = getServiceName(booking.service);
        serviceText = name || booking.service || 'Not specified';
    }

    // Get logo URL from environment or use default
    const logoUrl = process.env.STUDIO_LOGO_URL || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/amar.png`;
    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
                .container { max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .logo-container { background: white; padding: 30px 20px; text-align: center; border-bottom: 3px solid #f59e0b; }
                .logo { max-width: 180px; height: auto; display: block; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #f59e0b, #8b5cf6); color: white; padding: 30px; text-align: center; }
                .content { background: #f9fafb; padding: 30px; }
                .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #f59e0b; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; background: white; padding: 20px; }
                .highlight { color: #f59e0b; font-weight: bold; }
                @media only screen and (max-width: 600px) {
                    .container { width: 100% !important; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo-container">
                    <img src="${logoUrl}" alt="Amar Digital Studio Logo" class="logo" />
                </div>
                <div class="header">
                    <h1 style="margin: 10px 0;">📸 Booking Confirmed!</h1>
                    <p style="margin: 0;">Amar Digital Studio</p>
                </div>
                <div class="content">
                    <p>Dear <strong>${booking.name}</strong>,</p>
                    <p>Thank you for choosing Amar Digital Studio! Your booking has been confirmed.</p>
                    
                    <div class="info-box">
                        <h3 style="margin-top: 0;">📋 Booking Details</h3>
                        <p><strong>Services:</strong> ${serviceText}</p>
                        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        ${booking.numberOfDays > 1 ? `<p><strong>Duration:</strong> ${booking.numberOfDays} days</p>` : ''}
                        ${booking.time ? `<p><strong>Time:</strong> ${booking.time}</p>` : ''}
                        ${booking.price ? `<p><strong>Total Price:</strong> ₹${parseFloat(booking.price).toFixed(2)}</p>` : ''}
                    </div>

                    ${booking.message ? `
                    <div class="info-box" style="border-left-color: #8b5cf6;">
                        <h4 style="margin-top: 0;">💬 Your Special Requirements:</h4>
                        <p>${booking.message}</p>
                    </div>
                    ` : ''}

                    <p>We will contact you within 24 hours to finalize all details and answer any questions you may have.</p>
                    
                    <p>For any inquiries, please contact us:</p>
                    <ul>
                        <li><strong>Phone:</strong> +91 8849058787</li>
                        <li><strong>Email:</strong> contact@amardigitalstudio.com</li>
                    </ul>
                </div>
                <div class="footer">
                    <p style="margin: 0;">Best regards,<br>
                    <strong>The Amar Digital Studio Team</strong><br>
                    <small>Creating memories that last forever ✨</small></p>
                </div>
            </div>
        </body>
        </html>
    `;

    return await sendMail({
        to: booking.email,
        subject: '✅ Booking Confirmed - Amar Digital Studio',
        html,
        text: `Booking confirmed for ${serviceText} on ${new Date(booking.date).toLocaleDateString()}${booking.time ? ` at ${booking.time}` : ''}`,
    });
};

/**
 * Send SMS - Currently disabled due to email-to-SMS limitations
 * For proper SMS delivery, integrate a service like:
 * - TextLocal (India - recommended)
 * - Twilio (International - paid)
 * - AWS SNS (paid)
 */
const sendSMS = async (phoneNumber, message) => {
    try {
        const cleanPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
        
        // Skip SMS sending for now - email-to-SMS doesn't work reliably
        console.log('ℹ️ SMS sending skipped - requires SMS service integration');
        console.log('   Would send to:', phoneNumber);
        console.log('   Message:', message);
        console.log('   💡 Tip: Integrate TextLocal or Twilio for reliable SMS delivery');
        
        // TODO: Integrate proper SMS service
        // Example for TextLocal (India):
        // const axios = require('axios');
        // const response = await axios.get('https://api.textlocal.in/send/', {
        //     params: {
        //         apikey: process.env.TEXTLOCAL_API_KEY,
        //         numbers: phoneNumber,
        //         message: message,
        //         sender: 'TXTCL'
        //     }
        // });
        
        return { 
            success: false, 
            message: 'SMS integration required - see BACKEND/SMS_INTEGRATION_GUIDE.md' 
        };
    } catch (error) {
        console.error('SMS sending error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send contact form notification
 */
const sendContactNotification = async (contact) => {
    const html = `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
    `;

    return await sendMail({
        to: process.env.ADMIN_EMAIL || 'admin@amarstudio.com',
        subject: `New Contact: ${contact.subject}`,
        html,
    });
};

const upload_file = async function (
    req,
    res,
    next,
    file_name = "",
    directory_name = "",
    allowedTypes = []
) {
    const files = req.files;
    if (files && files.length > 0) {
        let uploadedFileName = [];
        for (const file of files) {
            if (file.fieldname === file_name) {
                const fileExtension = file.mimetype.split('/')[1];
                if (allowedTypes.length > 0 && !allowedTypes.includes(fileExtension)) {
                    console.log(`File type not allowed: ${fileExtension}`);
                    return false;
                }
                const filename = uuidv4() + "_" + file.originalname.replace(/\s/g, "");
                let dirname = `./${uploadDir.uploadDir.UPLOAD_DIR}`;
                if (directory_name) {
                    dirname += `/${directory_name}`;
                }

                if (!fs.existsSync(dirname)) {
                    fs.mkdirSync(dirname, { recursive: true });
                }

                const filePath = `${dirname}/${filename}`;
                try {
                    fs.writeFileSync(filePath, file.buffer);
                    uploadedFileName.push(filename);
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
        }
        if (uploadedFileName.length > 1) {
            return uploadedFileName;
        } else {
            return uploadedFileName[0];
        }
    } else {
        return false;
    }
};

const delete_file = async function (file_path = "") {
    if (!file_path) {
        throw new Error("File path is required");
    }
    try {
        if (fs.existsSync(file_path)) {
            await fs.promises.unlink(file_path);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        return false;
    }
};

module.exports = {
    generateResponse,
    sendMail,
    upload_file,
    delete_file,
    sendBookingConfirmation,
    sendContactNotification,
    sendSMS,
};

