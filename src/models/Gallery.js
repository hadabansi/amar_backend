const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('wedding', 'portrait', 'event', 'commercial', 'engagement', 'maternity', 'videography'),
    allowNull: false,
  },
  mediaType: {
    type: DataTypes.ENUM('photo', 'video', 'mixed'),
    defaultValue: 'photo',
  },
  coverImageUrl: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('coverImageUrl');
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
  coverImagePublicId: {
    type: DataTypes.STRING(255),
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'galleries',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Gallery;
