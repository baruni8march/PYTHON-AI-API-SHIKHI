const aiService = require("../services/ai.service");
const { success, failure } = require("../utils/response");

const finalAssess = async (req, res) => {
  try {
    const result = await aiService.finalAssess(req.body);
    return success(res, result, "Final assessment completed");
  } catch (error) {
    return failure(
      res,
      "Final assessment failed",
      500,
      error.response?.data || error.message
    );
  }
};

const analyzeVitals = async (req, res) => {
  try {
    const result = await aiService.analyzeVitals(req.body);
    return success(res, result, "Vitals analysis completed");
  } catch (error) {
    return failure(
      res,
      "Vitals analysis failed",
      500,
      error.response?.data || error.message
    );
  }
};

const analyzeLab = async (req, res) => {
  try {
    const result = await aiService.analyzeLab(req.body);
    return success(res, result, "Lab analysis completed");
  } catch (error) {
    return failure(
      res,
      "Lab analysis failed",
      500,
      error.response?.data || error.message
    );
  }
};

const extractOcr = async (req, res) => {
  try {
    const result = await aiService.extractOcr(req.body);
    return success(res, result, "OCR extraction completed");
  } catch (error) {
    return failure(
      res,
      "OCR extraction failed",
      500,
      error.response?.data || error.message
    );
  }
};

module.exports = {
  finalAssess,
  analyzeVitals,
  analyzeLab,
  extractOcr,
};