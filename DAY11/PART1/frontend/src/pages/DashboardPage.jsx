import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Download,
  MessageCircle,
  Stethoscope,
  UploadCloud,
  WifiOff,
} from "lucide-react";

import Header from "../components/Header";
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
};

const DashboardPage = () => {
  const [language, setLanguage] = useState("bn");
  const [theme, setTheme] = useState("light");

  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

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

  const isDark = theme === "dark";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-emerald-50">
        <p className="text-xl font-black text-emerald-700">
          {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
        </p>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen ${
        isDark
          ? "bg-slate-950"
          : "bg-gradient-to-br from-emerald-50 via-white to-green-100"
      }`}
    >
      <div className="mx-auto w-[94%] max-w-7xl py-6">
        <Header
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />

        {apiError && (
          <div className="mb-5 rounded-2xl bg-red-100 p-4 font-bold text-red-700">
            {apiError}
          </div>
        )}

        <section className="grid gap-5 rounded-[2rem] bg-white/85 p-6 shadow-xl ring-1 ring-emerald-100 backdrop-blur md:grid-cols-[1.5fr_0.8fr] md:p-8">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
              <Stethoscope size={17} />
              {language === "bn" ? "স্বাস্থ্য সহায়ক" : "Health Assistant"}
            </p>

            <h2 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              {summary
                ? textByLanguage(summary, "greeting", language)
                : language === "bn"
                ? "স্বাস্থ্য সহায়ক ড্যাশবোর্ড"
                : "Health Assistant Dashboard"}
            </h2>

            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              {language === "bn"
                ? "লক্ষণ, রিপোর্ট, প্রেসক্রিপশন ও স্বাস্থ্য ঝুঁকি সহজ ভাষায় বুঝুন। জরুরি লক্ষণ থাকলে দ্রুত ডাক্তার দেখানোর পরামর্শ নিন।"
                : "Understand symptoms, reports, prescriptions, and health risks in simple language. Get doctor warning for urgent signs."}
            </p>
          </div>

          {profile && (
            <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
              <p className="mb-3 text-sm font-black text-emerald-700">
                {language === "bn" ? "রোগীর প্রোফাইল" : "Patient Profile"}
              </p>

              <h3 className="text-2xl font-black text-slate-900">
                {textByLanguage(profile, "name", language)}
              </h3>

              <div className="mt-5 grid gap-3 text-sm font-bold text-slate-600">
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
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard
            title={language === "bn" ? "মোট রিপোর্ট" : "Total reports"}
            value={summary?.total_reports || 0}
          />

          <StatCard
            title={language === "bn" ? "উচ্চ ঝুঁকি সতর্কতা" : "High risk alerts"}
            value={summary?.high_risk_alerts || 0}
          />

          <StatCard
            title={language === "bn" ? "অপেক্ষমাণ রিভিউ" : "Pending reviews"}
            value={summary?.pending_reviews || 0}
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
            <h2 className="mb-5 text-2xl font-black text-slate-900">
              {language === "bn" ? "দ্রুত কাজ" : "Quick Actions"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {summary?.quick_actions?.map((action) => (
                <QuickActionCard
                  key={action.key}
                  icon={actionIcons[action.key]}
                  title={textByLanguage(action, "title", language)}
                  description={
                    language === "bn"
                      ? "শুরু করতে এখানে চাপ দিন"
                      : "Tap here to start"
                  }
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
            <h2 className="mb-5 text-2xl font-black text-slate-900">
              {language === "bn" ? "সাম্প্রতিক রিপোর্ট" : "Recent Reports"}
            </h2>

            <div className="grid gap-3">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} language={language} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
            <div className="mb-3 flex items-center gap-3 text-emerald-700">
              <WifiOff />
              <h3 className="text-xl font-black">
                {language === "bn" ? "লো ইন্টারনেট মোড" : "Low Internet Mode"}
              </h3>
            </div>

            <p className="font-medium leading-7 text-slate-600">
              {summary?.offline_mode
                ? textByLanguage(summary.offline_mode, "message", language)
                : ""}
            </p>
          </div>

          <div className="rounded-3xl bg-amber-50 p-6 shadow-sm ring-1 ring-amber-100">
            <div className="mb-3 flex items-center gap-3 text-amber-700">
              <AlertTriangle />
              <h3 className="text-xl font-black">
                {language === "bn" ? "নিরাপত্তা নোট" : "Safety Note"}
              </h3>
            </div>

            <p className="font-medium leading-7 text-amber-800">
              {language === "bn"
                ? "এই AI সহায়তা চূড়ান্ত রোগ নির্ণয় নয়। গুরুতর সমস্যা হলে দ্রুত ডাক্তার বা হাসপাতালে যোগাযোগ করুন।"
                : "This AI support is not a final diagnosis. For serious problems, contact a doctor or hospital quickly."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;