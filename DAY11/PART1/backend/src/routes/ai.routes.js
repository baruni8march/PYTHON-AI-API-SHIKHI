const express = require("express");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

router.post("/final-assess", aiController.finalAssess);
router.post("/vitals", aiController.analyzeVitals);
router.post("/lab", aiController.analyzeLab);
router.post("/ocr", aiController.extractOcr);

module.exports = router;