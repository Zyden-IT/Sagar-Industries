import Link from "next/link";
import Image from "next/image";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/SagarIndustries-logo.png"
        alt="Sagar Industries"
        width={140}
        height={40}
        priority
        className="h-8 w-auto sm:h-9 lg:h-10"
      />
    </Link>
  );
};

export default BrandLogo;
