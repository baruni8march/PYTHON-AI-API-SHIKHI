const dashboardService = require("../services/dashboard.service");
const { success } = require("../utils/response");

const getDashboardSummary = (req, res) => {
  const summary = dashboardService.getDemoSummary();
  return success(res, summary);
};

module.exports = {
  getDashboardSummary,
};