const StatCard = ({ title, value, note }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-100">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <h2 className="mt-2 text-4xl font-black text-emerald-600">{value}</h2>
      {note && <p className="mt-2 text-sm text-slate-500">{note}</p>}
    </div>
  );
};

export default StatCard;