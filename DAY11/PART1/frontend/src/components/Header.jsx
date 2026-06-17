import { HeartPulse, Leaf, Menu } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import SignInButton from "./SignInButton";

const Header = ({
  language,
  setLanguage,
  theme,
  setTheme,
  isDark,
  onOpenSidebar,
}) => {
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark
          ? "border-emerald-900/80 bg-slate-950/90"
          : "border-emerald-100 bg-white/85"
      }`}
    >
      <div className="mx-auto flex w-[94%] max-w-[1320px] flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md transition hover:scale-105 ${
              isDark
                ? "bg-emerald-900 text-lime-300 hover:bg-emerald-800"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            }`}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
              isDark
                ? "bg-emerald-400 text-emerald-950"
                : "bg-emerald-600 text-white"
            }`}
          >
            <HeartPulse size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1
                className={`text-xl font-black md:text-2xl ${
                  isDark ? "text-emerald-50" : "text-slate-950"
                }`}
              >
                {language === "bn"
                  ? "গ্রামীণ স্বাস্থ্য সহায়ক"
                  : "Rural Health Assistant"}
              </h1>

              <Leaf
                size={20}
                className={isDark ? "text-lime-300" : "text-emerald-600"}
              />
            </div>

            <p
              className={`text-sm font-bold ${
                isDark ? "text-emerald-200" : "text-slate-500"
              }`}
            >
              {language === "bn"
                ? "প্রকৃতি-অনুপ্রাণিত সহজ AI স্বাস্থ্য সহায়তা"
                : "Nature-inspired simple AI health support"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <LanguageToggle
            language={language}
            setLanguage={setLanguage}
            isDark={isDark}
          />
          <ThemeToggle theme={theme} setTheme={setTheme} isDark={isDark} />
          <SignInButton language={language} isDark={isDark} />
        </div>
      </div>
    </header>
  );
};

export default Header;