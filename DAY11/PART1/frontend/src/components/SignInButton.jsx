import { LogIn } from "lucide-react";

const SignInButton = ({ language, isDark }) => {
  return (
    <button
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black shadow-sm transition hover:scale-105 ${
        isDark
          ? "bg-lime-300 text-emerald-950 hover:bg-lime-200"
          : "bg-emerald-700 text-white hover:bg-emerald-800"
      }`}
    >
      <LogIn size={18} />
      {language === "bn" ? "সাইন ইন" : "Sign In"}
    </button>
  );
};

export default SignInButton;