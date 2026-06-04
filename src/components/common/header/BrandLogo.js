import Link from "next/link";
import Image from "next/image";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/SagarIndustries-logo.webp"
        alt="Sagar Industries"
        width={180}
        height={50}
        priority
        className="logo"
      />
    </Link>
  );
};

export default BrandLogo;
