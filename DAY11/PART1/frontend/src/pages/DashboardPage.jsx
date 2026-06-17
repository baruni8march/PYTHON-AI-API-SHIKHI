import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Download,
  MessageCircle,
  ShieldAlert,
  Stethoscope,
  UploadCloud,
  WifiOff,
} from "lucide-react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import ReportCard from "../components/ReportCard";
import {
  getDashboardSummary,
  getProfile,
  getReports,
} from "../api/dashboardApi";
import { textByLanguage } from "../utils/language";

const actionIcons = {
  chatbot: MessageCircle,
  lab_report: UploadCloud,
  vitals: Activity,
  pdf_report: Download,
  emergency: ShieldAlert,
  reminder: Bell,
};

const DashboardPage = () => {
  const [language, setLanguage] = useState("bn");
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const isDark = theme === "dark";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setApiError("");

        const [profileData, summaryData, reportsData] = await Promise.all([
          getProfile(),
          getDashboardSummary(),
          getReports(),
        ]);

        setProfile(profileData);
        setSummary(summaryData);
        setReports(reportsData);
      } catch (error) {
        setApiError(
          language === "bn"
            ? "Node backend চালু আছে কিনা চেক করুন।"
            : "Please check if Node backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [language]);

  const extraActions = [
    {
      key: "emergency",
      title_bn: "জরুরি সাহায্য",
      title_en: "Emergency Help",
    },
    {
      key: "reminder",
      title_bn: "মেডিসিন রিমাইন্ডার",
      title_en: "Medicine Reminder",
    },
  ];

  const quickActions = [...(summary?.quick_actions || []), ...extraActions];

  if (loading) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center ${
          isDark ? "bg-slate-950" : "bg-emerald-50"
        }`}
      >
        <p
          className={`text-xl font-black ${
            isDark ? "text-lime-300" : "text-emerald-700"
          }`}
        >
          {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
        </p>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen ${
        isDark
          ? "bg-[radial-gradient(circle_at_top_left,#064e3b,#020617_48%,#03150d)]"
          : "bg-[radial-gradient(circle_at_top_left,#dcfce7,#ffffff_45%,#ecfccb)]"
      }`}
    >
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        isDark={isDark}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        language={language}
        isDark={isDark}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="mx-auto w-[94%] max-w-[1320px] py-12">
        <div className="space-y-12">
          {apiError && (
            <div className="rounded-2xl bg-red-100 p-5 font-black text-red-700 shadow">
              {apiError}
            </div>
          )}

          <section
            className={`relative overflow-hidden rounded-[2.7rem] p-8 shadow-2xl ring-1 md:p-12 ${
              isDark
                ? "bg-slate-900/85 ring-emerald-800"
                : "bg-white/85 ring-emerald-100"
            }`}
          >
            <div
              className={`absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${
                isDark ? "bg-emerald-500/20" : "bg-emerald-300/35"
              }`}
            />

            <div className="relative grid gap-10 md:grid-cols-[1.4fr_0.8fr]">
              <div>
                <p
                  className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
                    isDark
                      ? "bg-emerald-950 text-lime-300"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <Stethoscope size={17} />
                  {language === "bn" ? "স্বাস্থ্য সহায়ক" : "Health Assistant"}
                </p>

                <h2
                  className={`max-w-3xl text-4xl font-black leading-tight md:text-6xl ${
                    isDark ? "text-emerald-50" : "text-slate-950"
                  }`}
                >
                  {summary
                    ? textByLanguage(summary, "greeting", language)
                    : language === "bn"
                    ? "স্বাস্থ্য সহায়ক ড্যাশবোর্ড"
                    : "Health Assistant Dashboard"}
                </h2>

                <p
                  className={`mt-6 max-w-2xl text-lg font-bold leading-9 ${
                    isDark ? "text-emerald-100" : "text-slate-600"
                  }`}
                >
                  {language === "bn"
                    ? "লক্ষণ, রিপোর্ট, প্রেসক্রিপশন ও স্বাস্থ্য ঝুঁকি সহজ ভাষায় বুঝুন। জরুরি লক্ষণ থাকলে দ্রুত ডাক্তার দেখানোর পরামর্শ নিন।"
                    : "Understand symptoms, reports, prescriptions, and health risks in simple language. Get doctor warning for urgent signs."}
                </p>
              </div>

              {profile && (
                <div
                  className={`rounded-[2rem] p-8 shadow-lg ring-1 ${
                    isDark
                      ? "bg-emerald-950/70 ring-emerald-800"
                      : "bg-emerald-50 ring-emerald-100"
                  }`}
                >
                  <p
                    className={`mb-4 text-sm font-black ${
                      isDark ? "text-lime-300" : "text-emerald-700"
                    }`}
                  >
                    {language === "bn" ? "রোগীর প্রোফাইল" : "Patient Profile"}
                  </p>

                  <h3
                    className={`text-2xl font-black ${
                      isDark ? "text-emerald-50" : "text-slate-950"
                    }`}
                  >
                    {textByLanguage(profile, "name", language)}
                  </h3>

                  <div
                    className={`mt-6 grid gap-4 text-sm font-bold ${
                      isDark ? "text-emerald-100" : "text-slate-600"
                    }`}
                  >
                    <p>{language === "bn" ? "বয়স" : "Age"}: {profile.age || "N/A"}</p>
                    <p>{language === "bn" ? "লিঙ্গ" : "Gender"}: {profile.gender}</p>
                    <p>
                      {language === "bn" ? "রক্তের গ্রুপ" : "Blood group"}:{" "}
                      {profile.blood_group}
                    </p>
                    <p>{textByLanguage(profile, "location", language)}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2
              className={`mb-6 text-2xl font-black ${
                isDark ? "text-emerald-50" : "text-slate-950"
              }`}
            >
              {language === "bn" ? "দ্রুত কাজ" : "Quick Actions"}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.key}
                  icon={actionIcons[action.key]}
                  title={textByLanguage(action, "title", language)}
                  description={
                    language === "bn"
                      ? "শুরু করতে এখানে চাপ দিন"
                      : "Tap here to start"
                  }
                  isDark={isDark}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-3">
            <StatCard
              title={language === "bn" ? "মোট রিপোর্ট" : "Total Reports"}
              value={summary?.total_reports || 0}
              isDark={isDark}
            />

            <StatCard
              title={language === "bn" ? "উচ্চ ঝুঁকি সতর্কতা" : "High Risk Alerts"}
              value={summary?.high_risk_alerts || 0}
              isDark={isDark}
            />

            <StatCard
              title={language === "bn" ? "অপেক্ষমাণ রিভিউ" : "Pending Reviews"}
              value={summary?.pending_reviews || 0}
              isDark={isDark}
            />
          </section>

          <section className="grid gap-10 xl:grid-cols-[1fr_0.85fr]">
            <div
              className={`rounded-[2.3rem] p-8 shadow-xl ring-1 ${
                isDark
                  ? "bg-slate-900/85 ring-emerald-800"
                  : "bg-white/90 ring-emerald-100"
              }`}
            >
              <h2
                className={`mb-6 text-2xl font-black ${
                  isDark ? "text-emerald-50" : "text-slate-950"
                }`}
              >
                {language === "bn" ? "সাম্প্রতিক রিপোর্ট" : "Recent Reports"}
              </h2>

              <div className="grid gap-5">
                {reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    language={language}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-8">
              <div
                className={`rounded-[2.3rem] p-8 shadow-xl ring-1 ${
                  isDark
                    ? "bg-emerald-950/80 ring-emerald-800"
                    : "bg-white/90 ring-emerald-100"
                }`}
              >
                <div
                  className={`mb-4 flex items-center gap-3 ${
                    isDark ? "text-lime-300" : "text-emerald-700"
                  }`}
                >
                  <WifiOff />
                  <h3 className="text-xl font-black">
                    {language === "bn" ? "লো ইন্টারনেট মোড" : "Low Internet Mode"}
                  </h3>
                </div>

                <p
                  className={`font-bold leading-8 ${
                    isDark ? "text-emerald-100" : "text-slate-600"
                  }`}
                >
                  {summary?.offline_mode
                    ? textByLanguage(summary.offline_mode, "message", language)
                    : ""}
                </p>
              </div>

              <div
                className={`rounded-[2.3rem] p-8 shadow-xl ring-1 ${
                  isDark
                    ? "bg-amber-950/60 ring-amber-800"
                    : "bg-amber-50 ring-amber-100"
                }`}
              >
                <div
                  className={`mb-4 flex items-center gap-3 ${
                    isDark ? "text-amber-200" : "text-amber-700"
                  }`}
                >
                  <AlertTriangle />
                  <h3 className="text-xl font-black">
                    {language === "bn" ? "নিরাপত্তা নোট" : "Safety Note"}
                  </h3>
                </div>

                <p
                  className={`font-bold leading-8 ${
                    isDark ? "text-amber-100" : "text-amber-800"
                  }`}
                >
                  {language === "bn"
                    ? "এই AI সহায়তা চূড়ান্ত রোগ নির্ণয় নয়। গুরুতর সমস্যা হলে দ্রুত ডাক্তার বা হাসপাতালে যোগাযোগ করুন।"
                    : "This AI support is not a final diagnosis. For serious problems, contact a doctor or hospital quickly."}
                </p>
              </div>
            </div>
          </section>

          <Footer language={language} isDark={isDark} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;