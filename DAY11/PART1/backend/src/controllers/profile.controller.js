const profileService = require("../services/profile.service");
const { success } = require("../utils/response");

const getMyProfile = (req, res) => {
  const profile = profileService.getDemoProfile();
  return success(res, profile);
};

module.exports = {
  getMyProfile,
};