const express = require("express");

const healthRoutes = require("./health.routes");
const profileRoutes = require("./profile.routes");
const dashboardRoutes = require("./dashboard.routes");
const reportRoutes = require("./report.routes");
const aiRoutes = require("./ai.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/profile", profileRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/reports", reportRoutes);
router.use("/ai", aiRoutes);

module.exports = router;