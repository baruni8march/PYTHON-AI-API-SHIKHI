const getDemoReports = () => {
  return [
    {
      id: "rpt-001",
      title_bn: "জ্বর ও কাশি রিপোর্ট",
      title_en: "Fever and cough report",
      risk_level: "medium",
      output_type: "pdf",
      created_at: "2026-06-16",
    },
    {
      id: "rpt-002",
      title_bn: "ল্যাব রিপোর্ট বিশ্লেষণ",
      title_en: "Lab report analysis",
      risk_level: "low",
      output_type: "chat",
      created_at: "2026-06-15",
    },
  ];
};

module.exports = {
  getDemoReports,
};