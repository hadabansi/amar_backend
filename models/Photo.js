const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  imageUrl: {
    url: {
      type: String,
      required: [true, 'Please add an image'],
    },
    publicId: String,
    width: Number,
    height: Number,
  },
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    required: [true, 'Please add a gallery'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Delete photo from gallery when photo is deleted
PhotoSchema.pre('remove', async function (next) {
  await this.model('Gallery').updateOne(
    { _id: this.gallery },
    { $pull: { images: this._id } }
  );
  next();
});

module.exports = mongoose.model('Photo', PhotoSchema);

