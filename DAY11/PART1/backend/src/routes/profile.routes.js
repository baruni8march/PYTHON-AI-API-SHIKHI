const express = require("express");
const profileController = require("../controllers/profile.controller");

const router = express.Router();

router.get("/me", profileController.getMyProfile);

module.exports = router;