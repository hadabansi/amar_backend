const invoiceService = require('../../services/admin/invoiceService');

exports.getInvoices = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    };
    
    const invoices = await invoiceService.getInvoices(filters);
    return res.status(200).json({
      success: true,
      message: 'INVOICES_FETCHED_SUCCESS',
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'INVOICE_NOT_FOUND',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'INVOICE_FETCHED_SUCCESS',
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceByNumber = async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoiceByNumber(req.params.number);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'INVOICE_NOT_FOUND',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'INVOICE_FETCHED_SUCCESS',
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await invoiceService.createInvoice(req.body);
    return res.status(201).json({
      success: true,
      message: 'INVOICE_CREATED_SUCCESS',
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'INVOICE_UPDATED_SUCCESS',
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const result = await invoiceService.deleteInvoice(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'INVOICE_DELETED_SUCCESS',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { paidAmount } = req.body;
    const invoice = await invoiceService.updatePaymentStatus(req.params.id, paidAmount);
    return res.status(200).json({
      success: true,
      message: 'PAYMENT_STATUS_UPDATED',
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceStats = async (req, res, next) => {
  try {
    const stats = await invoiceService.getInvoiceStats();
    return res.status(200).json({
      success: true,
      message: 'INVOICE_STATS_FETCHED',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};


