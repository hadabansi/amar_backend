const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  invoiceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  
  // Client Details
  clientName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  clientEmail: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  clientPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  clientAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  // Invoice Items (stored as JSON)
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const value = this.getDataValue('items');
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    },
  },
  
  // Amounts
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  
  // Payment
  paidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  paymentStatus: {
    type: DataTypes.ENUM('unpaid', 'partial', 'paid'),
    defaultValue: 'unpaid',
  },
  
  // Additional Info
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  terms: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  // Booking Reference (optional)
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'invoices',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Invoice;


