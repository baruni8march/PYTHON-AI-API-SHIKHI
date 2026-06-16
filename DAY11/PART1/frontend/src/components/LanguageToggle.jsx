const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex rounded-full bg-white/80 p-1 shadow-sm">
      <button
        onClick={() => setLanguage("bn")}
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          language === "bn"
            ? "bg-emerald-600 text-white"
            : "text-slate-700 hover:bg-emerald-50"
        }`}
      >
        বাংলা
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          language === "en"
            ? "bg-emerald-600 text-white"
            : "text-slate-700 hover:bg-emerald-50"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;