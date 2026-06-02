const SpecCard = ({ icon: Icon, label, value, pos }) => (
  <div
    className={`absolute z-20 hidden xl:flex items-center gap-3 rounded-xl border border-theme bg-card/95 px-4 py-3 shadow-card backdrop-blur ${pos}`}
  >
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
      <Icon size={18} weight="bold" />
    </span>

    <span className="flex flex-col leading-tight">
      <span className="text-[11px] uppercase tracking-wide text-secondary">
        {label}
      </span>
      <span className="text-sm font-bold text-primary">
        {value}
      </span>
    </span>
  </div>
);

export default SpecCard;