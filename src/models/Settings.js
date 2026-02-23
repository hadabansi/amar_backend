const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  siteName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'Amar Digital Studio',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  owners: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  socialMedia: {
    type: DataTypes.JSON,
  },
}, {
  tableName: 'settings',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Settings;
