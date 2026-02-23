const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['wedding', 'portrait', 'event', 'commercial', 'engagement', 'maternity'],
  },
  coverImage: {
    url: {
      type: String,
      required: [true, 'Please add a cover image'],
    },
    publicId: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt on save
GallerySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', GallerySchema);

