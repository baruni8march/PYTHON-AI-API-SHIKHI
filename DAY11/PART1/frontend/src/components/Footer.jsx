import { Leaf, ShieldCheck } from "lucide-react";

const Footer = ({ language, isDark }) => {
  return (
    <footer
      className={`mt-8 rounded-[2rem] p-6 shadow-lg ring-1 ${
        isDark
          ? "bg-emerald-950/80 ring-emerald-800"
          : "bg-white/90 ring-emerald-100"
      }`}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
        <div>
          <div
            className={`mb-3 flex items-center gap-2 font-black ${
              isDark ? "text-lime-300" : "text-emerald-700"
            }`}
          >
            <ShieldCheck size={22} />
            {language === "bn" ? "নিরাপত্তা নোট" : "Safety Note"}
          </div>

          <p
            className={`font-bold leading-7 ${
              isDark ? "text-emerald-100" : "text-slate-600"
            }`}
          >
            {language === "bn"
              ? "এই AI সহায়তা চূড়ান্ত রোগ নির্ণয় নয়। গুরুতর লক্ষণ থাকলে দ্রুত ডাক্তার বা হাসপাতালে যোগাযোগ করুন।"
              : "This AI assistant is not a final medical diagnosis. For serious symptoms, contact a doctor or hospital quickly."}
          </p>
        </div>

        <div>
          <div
            className={`mb-3 flex items-center gap-2 font-black ${
              isDark ? "text-lime-300" : "text-emerald-700"
            }`}
          >
            <Leaf size={22} />
            {language === "bn" ? "স্বাস্থ্য বার্তা" : "Health Quote"}
          </div>

          <p
            className={`font-bold italic leading-7 ${
              isDark ? "text-emerald-100" : "text-slate-600"
            }`}
          >
            {language === "bn"
              ? "“ভালো স্বাস্থ্য শুরু হয় সহজ যত্ন থেকে।”"
              : "“Good health begins with simple care.”"}
          </p>

          <p
            className={`mt-4 text-sm font-black ${
              isDark ? "text-lime-300" : "text-emerald-700"
            }`}
          >
            Developed by Full Stack Developer Riddhi Das Sneha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;