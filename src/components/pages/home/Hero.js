import Left from "./hero/Left";
import Right from "./hero/Right";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* ── Decorative background ──────────────────────────────────── */}
      {/* warm gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 85% 18%, rgba(245,132,42,0.16), transparent 70%), radial-gradient(50% 50% at 8% 95%, rgba(237,40,46,0.10), transparent 70%)",
        }}
      />
      {/* blurred accent blobs */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />
      {/* fine grain texture */}
      <div className="bg-grain absolute inset-0 opacity-60 pointer-events-none"></div>
      <div className="container relative">
        <div className="flex min-h-[calc(100dvh-64px)] flex-col justify-center gap-6 py-6 sm:py-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16 xl:gap-14">
          <Left />
          <Right />
        </div>
      </div>
    </section>
  );
};

export default Hero;
