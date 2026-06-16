require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  PYTHON_AI_BASE_URL:
    process.env.PYTHON_AI_BASE_URL || "http://127.0.0.1:8000",
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || "bn",
  SUPPORTED_LANGUAGES: process.env.SUPPORTED_LANGUAGES || "bn,en",
  APP_MODE: process.env.APP_MODE || "development",
};