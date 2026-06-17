const StatCard = ({ title, value, note, isDark }) => {
  return (
    <div
      className={`rounded-[1.8rem] p-8 shadow-lg ring-1 transition hover:-translate-y-1 hover:shadow-2xl ${
        isDark
          ? "bg-slate-900/90 ring-emerald-800"
          : "bg-white/90 ring-emerald-100"
      }`}
    >
      <p
        className={`text-sm font-black ${
          isDark ? "text-emerald-200" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h2
        className={`mt-3 text-5xl font-black ${
          isDark ? "text-lime-300" : "text-emerald-700"
        }`}
      >
        {value}
      </h2>

      {note && (
        <p
          className={`mt-3 text-sm font-bold ${
            isDark ? "text-emerald-300" : "text-slate-500"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
};

export default StatCard;