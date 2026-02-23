const Invoice = require('../../models/Invoice');
const { Op } = require('sequelize');

// Generate invoice number
const generateInvoiceNumber = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  
  const prefix = `INV-${year}${month}`;
  
  const lastInvoice = await Invoice.findOne({
    where: {
      invoiceNumber: {
        [Op.like]: `${prefix}%`,
      },
    },
    order: [['invoiceNumber', 'DESC']],
  });
  
  let sequence = 1;
  if (lastInvoice) {
    const lastSequence = parseInt(lastInvoice.invoiceNumber.split('-').pop());
    sequence = lastSequence + 1;
  }
  
  return `${prefix}-${String(sequence).padStart(4, '0')}`;
};

// Get all invoices
exports.getInvoices = async (filters = {}) => {
  const where = { isDeleted: false };
  
  if (filters.status) {
    where.paymentStatus = filters.status;
  }
  
  if (filters.startDate && filters.endDate) {
    where.invoiceDate = {
      [Op.between]: [filters.startDate, filters.endDate],
    };
  }
  
  const invoices = await Invoice.findAll({
    where,
    order: [['invoiceDate', 'DESC'], ['id', 'DESC']],
  });
  
  return invoices;
};

// Get invoice by ID
exports.getInvoiceById = async (id) => {
  const invoice = await Invoice.findOne({
    where: { id, isDeleted: false },
  });
  return invoice;
};

// Get invoice by number
exports.getInvoiceByNumber = async (invoiceNumber) => {
  const invoice = await Invoice.findOne({
    where: { invoiceNumber, isDeleted: false },
  });
  return invoice;
};

// Create invoice
exports.createInvoice = async (data) => {
  // Generate invoice number if not provided
  if (!data.invoiceNumber) {
    data.invoiceNumber = await generateInvoiceNumber();
  }
  
  // Calculate totals if not provided
  if (!data.subtotal || !data.total) {
    const subtotal = data.items.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) * parseFloat(item.rate));
    }, 0);
    
    const tax = parseFloat(data.tax) || 0;
    const discount = parseFloat(data.discount) || 0;
    const total = subtotal + tax - discount;
    
    data.subtotal = subtotal;
    data.total = total;
  }
  
  const invoice = await Invoice.create(data);
  return invoice;
};

// Update invoice
exports.updateInvoice = async (id, data) => {
  const invoice = await Invoice.findOne({
    where: { id, isDeleted: false },
  });
  
  if (!invoice) {
    throw new Error('Invoice not found');
  }
  
  // Recalculate totals if items changed
  if (data.items) {
    const subtotal = data.items.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) * parseFloat(item.rate));
    }, 0);
    
    const tax = parseFloat(data.tax) || parseFloat(invoice.tax) || 0;
    const discount = parseFloat(data.discount) || parseFloat(invoice.discount) || 0;
    const total = subtotal + tax - discount;
    
    data.subtotal = subtotal;
    data.total = total;
  }
  
  await invoice.update(data);
  return invoice;
};

// Delete invoice (soft delete)
exports.deleteInvoice = async (id) => {
  const invoice = await Invoice.findOne({
    where: { id, isDeleted: false },
  });
  
  if (!invoice) {
    throw new Error('Invoice not found');
  }
  
  await invoice.update({ isDeleted: true });
  return { message: 'Invoice deleted successfully' };
};

// Update payment status
exports.updatePaymentStatus = async (id, paidAmount) => {
  const invoice = await Invoice.findOne({
    where: { id, isDeleted: false },
  });
  
  if (!invoice) {
    throw new Error('Invoice not found');
  }
  
  const total = parseFloat(invoice.total);
  const paid = parseFloat(paidAmount);
  
  let paymentStatus = 'unpaid';
  if (paid >= total) {
    paymentStatus = 'paid';
  } else if (paid > 0) {
    paymentStatus = 'partial';
  }
  
  await invoice.update({
    paidAmount: paid,
    paymentStatus,
  });
  
  return invoice;
};

// Get invoice statistics
exports.getInvoiceStats = async () => {
  const invoices = await Invoice.findAll({
    where: { isDeleted: false },
  });
  
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + parseFloat(inv.paidAmount), 0);
  const totalOutstanding = totalAmount - totalPaid;
  
  const paid = invoices.filter(inv => inv.paymentStatus === 'paid').length;
  const partial = invoices.filter(inv => inv.paymentStatus === 'partial').length;
  const unpaid = invoices.filter(inv => inv.paymentStatus === 'unpaid').length;
  
  return {
    totalInvoices,
    totalAmount,
    totalPaid,
    totalOutstanding,
    paid,
    partial,
    unpaid,
  };
};


