const env = require("../config/env");
const { success } = require("../utils/response");

const getHealth = (req, res) => {
  return success(res, {
    service: "node-backend",
    status: "ok",
    default_language: env.DEFAULT_LANGUAGE,
    supported_languages: env.SUPPORTED_LANGUAGES.split(","),
    python_ai_base_url: env.PYTHON_AI_BASE_URL,
  });
};

module.exports = {
  getHealth,
};