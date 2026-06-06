import Link from "next/link";
import { House, CaretRight } from "@phosphor-icons/react";

const Breadcrumb = ({
  title,
  description,
  trail = [],
}) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Banner background — image swaps with theme via .breadcrumb-banner CSS */}
      <div
        aria-hidden
        className="breadcrumb-banner absolute inset-0 bg-cover bg-center"
        style={{
          "--bc-img-light": "url('/print-light.webp')",
          "--bc-img-dark": "url('/print-dark.webp')",
        }}
      ></div>
      <div className="bg-grain absolute inset-0 opacity-60 pointer-events-none"></div>

      <div className="container relative py-20">
        <div className="max-w-4xl text-left">
          {/* Breadcrumb */}
          {trail.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium backdrop-blur-sm"
            >
              <Link
                href="/"
                aria-label="Home"
                className="flex items-center text-text-secondary transition-colors hover:text-accent"
              >
                <House size={16} weight="fill" />
              </Link>

              {trail
                .filter((item) => item.label.toLowerCase() !== "home")
                .map((item, i, arr) => {
                  const isLast = i === arr.length - 1;

                  return (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <CaretRight
                        size={12}
                        weight="bold"
                        className="text-text-secondary/60"
                      />

                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="text-secondary transition-colors hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="font-semibold text-secondary">
                          {item.label}
                        </span>
                      )}
                    </div>
                  );
                })}
            </nav>
          )}

          {/* Title */}
          <h1 className="text-text-primary">
            {title}
          </h1>

          {/* Body text */}
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
