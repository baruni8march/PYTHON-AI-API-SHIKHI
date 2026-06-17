import {
  Activity,
  Bell,
  ClipboardCheck,
  Download,
  FileText,
  History,
  Home,
  MessageCircle,
  Settings,
  ShieldAlert,
  UploadCloud,
  X,
} from "lucide-react";

const getItems = (language) => [
  { icon: Home, label: language === "bn" ? "হোম" : "Home" },
  { icon: MessageCircle, label: language === "bn" ? "চ্যাটবট" : "Chatbot" },
  {
    icon: UploadCloud,
    label: language === "bn" ? "ল্যাব রিপোর্ট" : "Lab Report",
  },
  {
    icon: FileText,
    label: language === "bn" ? "প্রেসক্রিপশন OCR" : "Prescription OCR",
  },
  {
    icon: Activity,
    label: language === "bn" ? "ভাইটালস চেক" : "Check Vitals",
  },
  {
    icon: ClipboardCheck,
    label: language === "bn" ? "ফাইনাল অ্যাসেসমেন্ট" : "Final Assessment",
  },
  {
    icon: Download,
    label: language === "bn" ? "PDF রিপোর্ট" : "PDF Report",
  },
  {
    icon: History,
    label: language === "bn" ? "রিপোর্ট হিস্ট্রি" : "Report History",
  },
  {
    icon: Bell,
    label: language === "bn" ? "মেডিসিন রিমাইন্ডার" : "Medicine Reminder",
  },
  {
    icon: ShieldAlert,
    label: language === "bn" ? "জরুরি সাহায্য" : "Emergency Help",
  },
  { icon: Settings, label: language === "bn" ? "সেটিংস" : "Settings" },
];

const Sidebar = ({ language, isDark, isOpen, onClose }) => {
  const items = getItems(language);

  return (
    <>
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[90] h-screen w-[340px] max-w-[88%] transform overflow-y-auto p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "bg-slate-950 text-emerald-50" : "bg-white text-slate-950"}`}
      >
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p
              className={`text-sm font-black ${
                isDark ? "text-lime-300" : "text-emerald-700"
              }`}
            >
              {language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
            </p>

            <h2 className="mt-1 text-2xl font-black">
              {language === "bn" ? "ফিচার মেনু" : "Feature Menu"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition hover:scale-105 ${
              isDark
                ? "bg-emerald-900 text-lime-300"
                : "bg-emerald-100 text-emerald-700"
            }`}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm font-black shadow-sm transition hover:scale-[1.02] ${
                  index === 0
                    ? isDark
                      ? "bg-lime-300 text-emerald-950"
                      : "bg-emerald-600 text-white"
                    : isDark
                    ? "bg-emerald-950/70 text-emerald-100 hover:bg-emerald-900"
                    : "bg-emerald-50 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800"
                }`}
              >
                <Icon size={21} />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;