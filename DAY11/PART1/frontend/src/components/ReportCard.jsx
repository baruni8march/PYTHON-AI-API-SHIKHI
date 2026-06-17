import { FileText } from "lucide-react";
import { textByLanguage } from "../utils/language";

const ReportCard = ({ report, language, isDark }) => {
  const title = textByLanguage(report, "title", language);

  const riskClass = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`flex items-center justify-between gap-5 rounded-2xl p-5 shadow-sm ring-1 ${
        isDark
          ? "bg-emerald-950/70 ring-emerald-800"
          : "bg-emerald-50/80 ring-emerald-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            isDark
              ? "bg-lime-300 text-emerald-950"
              : "bg-white text-emerald-700"
          }`}
        >
          <FileText size={22} />
        </div>

        <div>
          <h3
            className={`font-black ${
              isDark ? "text-emerald-50" : "text-slate-950"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 text-sm font-bold ${
              isDark ? "text-emerald-200" : "text-slate-500"
            }`}
          >
            {language === "bn" ? "তারিখ" : "Date"}: {report.created_at}
          </p>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-black capitalize ${
          riskClass[report.risk_level] || "bg-slate-100 text-slate-700"
        }`}
      >
        {report.risk_level}
      </span>
    </div>
  );
};

export default ReportCard;