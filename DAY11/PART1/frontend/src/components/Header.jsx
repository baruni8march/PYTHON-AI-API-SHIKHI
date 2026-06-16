import { HeartPulse } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const Header = ({ language, setLanguage, theme, setTheme }) => {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
          <HeartPulse size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {language === "bn" ? "গ্রামীণ স্বাস্থ্য সহায়ক" : "Rural Health Assistant"}
          </h1>
          <p className="text-sm font-medium text-slate-500">
            {language === "bn"
              ? "সহজ ভাষায় AI স্বাস্থ্য সহায়তা"
              : "Simple AI health support"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};

export default Header;