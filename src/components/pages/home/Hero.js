import Left from "./hero/Left";
import Right from "./hero/Right";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-theme">
      <div className="container relative">
        <div className="grid items-center gap-10 py-12 lg:min-h-[calc(100dvh-64px)] lg:grid-cols-12 lg:gap-10 lg:py-16 xl:gap-14">
          <Left />
          <Right />
        </div>
      </div>
    </section>
  );
};

export default Hero;
