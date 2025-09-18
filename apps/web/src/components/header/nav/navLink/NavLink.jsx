"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({path, children, title}) => {
    const pathName = usePathname()
    // console.log(pathName);
  return (
    <Link
      href={path}
      title={title}
      className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ease-in-out transform 
        ${path === pathName 
          ? "text-white bg-blue-600 shadow-md shadow-blue-500/20 lg:text-blue-400 lg:bg-transparent lg:border-b-2 lg:border-blue-500 lg:rounded-none lg:shadow-none lg:font-semibold" 
          : "text-gray-200 hover:bg-blue-500/10"
        } 
        hover:text-blue-400 hover:scale-105 lg:hover:scale-100 lg:hover:border-blue-400/50 lg:mx-1 relative overflow-hidden
        before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0 before:bg-blue-500/10 hover:before:h-full before:transition-all before:duration-300 before:-z-10
      `}
      data-abc={true}
    >
      {children}
    </Link>
  );
}

export default NavLink