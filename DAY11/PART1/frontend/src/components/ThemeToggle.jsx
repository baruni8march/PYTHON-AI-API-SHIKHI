import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-emerald-50"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;