const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  imageUrl: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('imageUrl');
      if (!rawValue) return null;
      
      // If it's a local file path, prepend BASE_URL
      if (rawValue.startsWith('uploads/')) {
        const baseUrl = process.env.BASE_URL || 'http://localhost:8001';
        return `${baseUrl}/${rawValue}`;
      }
      
      // Otherwise return as is (external URL or base64)
      return rawValue;
    }
  },
  imagePublicId: {
    type: DataTypes.STRING(255),
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'testimonials',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Testimonial;
