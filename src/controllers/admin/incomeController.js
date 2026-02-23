const incomeService = require('../../services/admin/incomeService');
const { generateResponse } = require('../../helpers');

exports.getIncomes = async (req, res, next) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      category: req.query.category,
    };
    
    const incomes = await incomeService.getIncomes(filters);
    return res.status(200).json({
      success: true,
      message: 'INCOMES_FETCHED_SUCCESS',
      data: incomes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getIncomeById = async (req, res, next) => {
  try {
    const income = await incomeService.getIncomeById(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'INCOME_NOT_FOUND',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'INCOME_FETCHED_SUCCESS',
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

exports.createIncome = async (req, res, next) => {
  try {
    const income = await incomeService.createIncome(req.body);
    return res.status(201).json({
      success: true,
      message: 'INCOME_CREATED_SUCCESS',
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateIncome = async (req, res, next) => {
  try {
    const income = await incomeService.updateIncome(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'INCOME_UPDATED_SUCCESS',
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const result = await incomeService.deleteIncome(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'INCOME_DELETED_SUCCESS',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMonthlySummary = async (req, res, next) => {
  try {
    const { year, month } = req.query;
    const summary = await incomeService.getMonthlySummary(parseInt(year), parseInt(month));
    return res.status(200).json({
      success: true,
      message: 'MONTHLY_SUMMARY_FETCHED',
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

exports.getYearlySummary = async (req, res, next) => {
  try {
    const { year } = req.query;
    const summary = await incomeService.getYearlySummary(parseInt(year));
    return res.status(200).json({
      success: true,
      message: 'YEARLY_SUMMARY_FETCHED',
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

