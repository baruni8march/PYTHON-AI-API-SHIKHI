const axios = require("axios");
const env = require("../config/env");

const normalizePythonResponse = (pythonResponse) => {
  if (
    pythonResponse &&
    pythonResponse.success === true &&
    pythonResponse.data !== undefined
  ) {
    return pythonResponse.data;
  }

  return pythonResponse;
};

const callPythonAi = async (endpoint, payload) => {
  const response = await axios.post(
    `${env.PYTHON_AI_BASE_URL}${endpoint}`,
    payload,
    {
      timeout: 60000,
    }
  );

  return normalizePythonResponse(response.data);
};

const finalAssess = async (payload) => {
  return callPythonAi("/final/assess", payload);
};

const analyzeVitals = async (payload) => {
  return callPythonAi("/vitals/analyze", payload);
};

const analyzeLab = async (payload) => {
  return callPythonAi("/lab/analyze", payload);
};

const extractOcr = async (payload) => {
  return callPythonAi("/ocr/extract", payload);
};

module.exports = {
  finalAssess,
  analyzeVitals,
  analyzeLab,
  extractOcr,
};