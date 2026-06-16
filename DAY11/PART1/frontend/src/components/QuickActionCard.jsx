const QuickActionCard = ({ icon: Icon, title, description }) => {
  return (
    <button className="group rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-500 hover:bg-white hover:shadow-md">
      {Icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white">
          <Icon size={22} />
        </div>
      )}

      <h3 className="text-lg font-black text-slate-900">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {description}
      </p>
    </button>
  );
};

export default QuickActionCard;