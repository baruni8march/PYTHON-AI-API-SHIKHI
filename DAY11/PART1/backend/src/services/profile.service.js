const getDemoProfile = () => {
  return {
    id: "demo-patient-001",
    name_bn: "ডেমো রোগী",
    name_en: "Demo Patient",
    age: 32,
    gender: "female",
    phone: "+8801XXXXXXXXX",
    location_bn: "গ্রাম, বাংলাদেশ",
    location_en: "Village, Bangladesh",
    blood_group: "B+",
    preferred_language: "bn",
    ui_mode: "simple",
  };
};

module.exports = {
  getDemoProfile,
};