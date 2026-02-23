const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Photo = sequelize.define('Photo', {
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
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  imageWidth: {
    type: DataTypes.INTEGER,
  },
  imageHeight: {
    type: DataTypes.INTEGER,
  },
  galleryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'galleries',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'photos',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Photo;
