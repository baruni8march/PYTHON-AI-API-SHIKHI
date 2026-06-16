const getDemoSummary = () => {
  return {
    greeting_bn: "স্বাস্থ্য সহায়ক ড্যাশবোর্ডে স্বাগতম",
    greeting_en: "Welcome to your health assistant dashboard",
    total_reports: 8,
    high_risk_alerts: 2,
    pending_reviews: 1,
    quick_actions: [
      {
        key: "chatbot",
        title_bn: "চ্যাটবটের সাথে কথা বলুন",
        title_en: "Talk to Chatbot",
      },
      {
        key: "lab_report",
        title_bn: "ল্যাব রিপোর্ট আপলোড করুন",
        title_en: "Upload Lab Report",
      },
      {
        key: "vitals",
        title_bn: "ভাইটালস চেক করুন",
        title_en: "Check Vitals",
      },
      {
        key: "pdf_report",
        title_bn: "PDF রিপোর্ট তৈরি করুন",
        title_en: "Generate PDF Report",
      },
    ],
    offline_mode: {
      enabled: true,
      message_bn: "ইন্টারনেট না থাকলে তথ্য সাময়িকভাবে ডিভাইসে রাখা হবে।",
      message_en:
        "If internet is unavailable, data will be saved temporarily on the device.",
    },
  };
};

module.exports = {
  getDemoSummary,
};