import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ theme, setTheme, isDark }) => {
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black shadow-sm transition ${
        isDark
          ? "bg-emerald-950/80 text-emerald-100 hover:bg-emerald-900"
          : "bg-white/90 text-slate-700 hover:bg-emerald-50"
      }`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;