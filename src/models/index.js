const User = require('./User');
const Gallery = require('./Gallery');
const Photo = require('./Photo');
const Testimonial = require('./Testimonial');
const Booking = require('./Booking');
const Contact = require('./Contact');
const Settings = require('./Settings');
const Category = require('./Category');
const Income = require('./Income');
const Invoice = require('./Invoice');
const Service = require('./Service');

// Define relationships
Gallery.hasMany(Photo, {
  foreignKey: 'galleryId',
  as: 'images',
  onDelete: 'CASCADE',
});

Photo.belongsTo(Gallery, {
  foreignKey: 'galleryId',
  as: 'gallery',
});

module.exports = {
  User,
  Gallery,
  Photo,
  Testimonial,
  Booking,
  Contact,
  Settings,
  Category,
  Income,
  Invoice,
  Service,
};
