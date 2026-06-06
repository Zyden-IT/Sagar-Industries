// Full-width call-to-action band.
//   <CTASection title="..." subtitle="..." primary={{label,href}} secondary={{label,href}} />
import Link from "next/link";

const CTASection = ({ title, subtitle, primary, secondary }) => {
  return (
    <section className="section-py">
      <div className="container">
        <div className="rounded-[var(--radius-card)] bg-primary px-6 py-12 md:px-12 md:py-16 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            {title && <h2 className="text-white">{title}</h2>}
            {subtitle && <p className="text-text-secondary">{subtitle}</p>}

            {(primary || secondary) && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                {primary && (
                  <Link href={primary.href} className="btn-orange btn">
                    {primary.label}
                  </Link>
                )}
                {secondary && (
                  <Link href={secondary.href} className="btn-outline btn">
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
