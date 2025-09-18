"use client"
import Image from "next/image";
import Link from "next/link";
// import LogoImg from "../../../../public/logo.png";

const Logo = () => {
  
  return (
    <div className="logo">
      <Link href="/" data-abc={true}>
        {/* <Image src={LogoImg} width={60} alt="SeniorLink Home" /> */}
        <h1 className="text-xl font-extrabold tracking-tight text-white"><span className="text-blue-500">Wear</span>Hub</h1>
      </Link>
    </div>
  );
};

export default Logo;
