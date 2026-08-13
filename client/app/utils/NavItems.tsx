import Link from "next/link";
import React from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const linkClass = (index: number, mobile = false) =>
    `${
      activeItem === index
        ? "text-coral-600 dark:text-coral-400 font-[700]"
        : "text-[#3d3660] dark:text-slate-200 hover:text-coral-600 dark:hover:text-coral-400"
    } ${mobile ? "block py-4 text-[18px] px-4" : "text-[16px] px-5"} font-Poppins transition-colors duration-200`;

  return (
    <>
      <div className="hidden 800px:flex items-center">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={item.name} className={linkClass(index)}>
            {item.name}
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-2">
          <div className="w-full text-center py-4 border-b border-slate-200 dark:border-slate-700 mb-2">
            <Link href="/" className="text-[22px] font-Poppins font-[700] text-gradient">
              LearnSphere
            </Link>
          </div>
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={item.name} className={linkClass(index, true)}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
