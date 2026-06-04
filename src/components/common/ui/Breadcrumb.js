import Image from "next/image";
import Link from "next/link";
import { House, CaretRight } from "@phosphor-icons/react";

const Breadcrumb = ({ title, trail = [] }) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Banner background */}
      <Image
        src="/banner2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Orange Glow */}
      <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative py-20">
        <div className="max-w-4xl text-left">
          {/* Small Label */}
          <span className="eyebrow mb-4">Sagar Industries</span>

          {/* Title */}
          <h1 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-text-primary sm:text-5xl">
            {title}
          </h1>

          {/* Breadcrumb */}
          {trail.length > 0 && (
            <nav className="mt-6 flex items-center justify-start gap-2 text-sm font-medium">
              <House size={15} weight="fill" className="text-accent" />

              {trail.map((item, i) => {
                const isLast = i === trail.length - 1;

                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <CaretRight
                      size={12}
                      weight="bold"
                      className="text-text-secondary"
                    />

                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="text-text-secondary transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-accent">
                        {item.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
