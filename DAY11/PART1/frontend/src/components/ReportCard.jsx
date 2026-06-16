import { FileText } from "lucide-react";
import { textByLanguage } from "../utils/language";

const riskStyle = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

const ReportCard = ({ report, language }) => {
  const title = textByLanguage(report, "title", language);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600">
          <FileText size={21} />
        </div>

        <div>
          <h3 className="font-black text-slate-900">{title}</h3>
          <p className="text-sm font-medium text-slate-500">
            {language === "bn" ? "তারিখ" : "Date"}: {report.created_at}
          </p>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-black capitalize ${
          riskStyle[report.risk_level] || "bg-slate-100 text-slate-700"
        }`}
      >
        {report.risk_level}
      </span>
    </div>
  );
};

export default ReportCard;