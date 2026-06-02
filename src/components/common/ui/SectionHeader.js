// Reusable section heading: eyebrow + title + subtitle.
//   <SectionHeader eyebrow="Why Choose Us" title="..." subtitle="..." align="center" />
const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }) => {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${
        isCenter ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[2px]">
          <span className="h-[2px] w-6 bg-accent inline-block" />
          {eyebrow}
        </span>
      )}
      {title && <h2>{title}</h2>}
      {subtitle && <p className={`text-secondary ${isCenter ? "max-w-xl" : ""}`}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
