const Income = require('../../models/Income');
const { Op } = require('sequelize');

// Get all incomes
exports.getIncomes = async (filters = {}) => {
  const where = { isDeleted: false };
  
  if (filters.startDate && filters.endDate) {
    where.date = {
      [Op.between]: [filters.startDate, filters.endDate],
    };
  } else if (filters.startDate) {
    where.date = { [Op.gte]: filters.startDate };
  } else if (filters.endDate) {
    where.date = { [Op.lte]: filters.endDate };
  }
  
  if (filters.category) {
    where.category = filters.category;
  }
  
  const incomes = await Income.findAll({
    where,
    order: [['date', 'DESC']],
  });
  
  return incomes;
};

// Get income by ID
exports.getIncomeById = async (id) => {
  const income = await Income.findOne({
    where: { id, isDeleted: false },
  });
  return income;
};

// Create income
exports.createIncome = async (data) => {
  const income = await Income.create(data);
  return income;
};

// Update income
exports.updateIncome = async (id, data) => {
  const income = await Income.findOne({
    where: { id, isDeleted: false },
  });
  
  if (!income) {
    throw new Error('Income not found');
  }
  
  await income.update(data);
  return income;
};

// Delete income (soft delete)
exports.deleteIncome = async (id) => {
  const income = await Income.findOne({
    where: { id, isDeleted: false },
  });
  
  if (!income) {
    throw new Error('Income not found');
  }
  
  await income.update({ isDeleted: true });
  return { message: 'Income deleted successfully' };
};

// Get monthly summary
exports.getMonthlySummary = async (year, month) => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0);
  const endDateStr = `${year}-${String(month).padStart(2, '0')}-${endDate.getDate()}`;
  
  const incomes = await Income.findAll({
    where: {
      isDeleted: false,
      date: {
        [Op.between]: [startDate, endDateStr],
      },
    },
    order: [['date', 'ASC']],
  });
  
  const total = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
  
  return {
    month,
    year,
    total,
    count: incomes.length,
    incomes,
  };
};

// Get yearly summary
exports.getYearlySummary = async (year) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const incomes = await Income.findAll({
    where: {
      isDeleted: false,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    order: [['date', 'ASC']],
  });
  
  const total = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
  
  // Group by month
  const monthlyData = {};
  incomes.forEach(income => {
    const month = new Date(income.date).getMonth() + 1;
    if (!monthlyData[month]) {
      monthlyData[month] = { total: 0, count: 0 };
    }
    monthlyData[month].total += parseFloat(income.amount);
    monthlyData[month].count += 1;
  });
  
  return {
    year,
    total,
    count: incomes.length,
    monthlyData,
  };
};

