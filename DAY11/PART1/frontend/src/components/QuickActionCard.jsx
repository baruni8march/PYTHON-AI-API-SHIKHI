const QuickActionCard = ({ icon: Icon, title, description, isDark }) => {
  return (
    <button
      className={`group rounded-[1.8rem] p-7 text-left shadow-lg ring-1 transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl ${
        isDark
          ? "bg-emerald-950/80 ring-emerald-800 hover:bg-emerald-900"
          : "bg-white/90 ring-emerald-100 hover:bg-emerald-50"
      }`}
    >
      {Icon && (
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition ${
            isDark
              ? "bg-lime-300 text-emerald-950"
              : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
          }`}
        >
          <Icon size={26} />
        </div>
      )}

      <h3
        className={`text-xl font-black ${
          isDark ? "text-emerald-50" : "text-slate-950"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-3 text-sm font-bold leading-7 ${
          isDark ? "text-emerald-200" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </button>
  );
};

export default QuickActionCard;