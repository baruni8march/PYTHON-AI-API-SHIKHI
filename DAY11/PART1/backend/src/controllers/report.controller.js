const reportService = require("../services/report.service");
const { success } = require("../utils/response");

const getReports = (req, res) => {
  const reports = reportService.getDemoReports();
  return success(res, reports);
};

module.exports = {
  getReports,
};