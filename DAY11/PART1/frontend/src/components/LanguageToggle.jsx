const LanguageToggle = ({ language, setLanguage, isDark }) => {
  return (
    <div
      className={`flex rounded-full p-1 shadow-sm ${
        isDark ? "bg-emerald-950/80" : "bg-white/90"
      }`}
    >
      <button
        onClick={() => setLanguage("bn")}
        className={`rounded-full px-4 py-2 text-sm font-black transition ${
          language === "bn"
            ? "bg-emerald-600 text-white shadow-md"
            : isDark
            ? "text-emerald-100 hover:bg-emerald-900"
            : "text-slate-700 hover:bg-emerald-50"
        }`}
      >
        বাংলা
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-4 py-2 text-sm font-black transition ${
          language === "en"
            ? "bg-emerald-600 text-white shadow-md"
            : isDark
            ? "text-emerald-100 hover:bg-emerald-900"
            : "text-slate-700 hover:bg-emerald-50"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;