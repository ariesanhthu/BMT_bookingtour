"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const links = [
  { name: "Giới thiệu", href: "/about" },
  { name: "Sản phẩm", href: "/Tour", sublinks: ["Miền Bắc", "Miền Trung", "Miền Nam", "Khác"] },
  { name: "Đặt vé", href: "/Booking" },
  { name: "Ưu đãi", href: "/Discount" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [showSublist, setShowSublist] = useState(false);

  const handleMouseEnter = () => {
    setShowSublist(true);
  };

  const handleMouseLeave = () => {
    setShowSublist(false);
  };

  return (
    <header className="mb-8 border-b p-5">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div>
          <div className="flex gap-5">
            <div className="w-9 h-9 relative">

              <Image 
                src= {'/logo.jpg'}
                alt = "logo"
                // width={60}
                // height={60}
                fill
                className="object-cover object-center"
                
                />
              </div>
            <h1 className="text-2xl md:text-xl font-bold">
              <Link href="/">
              BLUE MOON<span className="text-primary">LIGHT</span>
              </Link>
            </h1>
          </div>
        </div>
        
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {link.sublinks ? (
                <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                  <span className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary cursor-pointer ${showSublist ? 'text-primary' : 'text-gray-600'}`}>
                    {link.name}
                  </span>
                  
                  {showSublist && (

                    <div className="absolute top-full left-0 py-2 px-4 shadow-xl bg-opacity-50 bg-black rounded-lg z-10 w-32">
                    
                      {link.sublinks.map((sublink, index) => (
                        <Link key={index} href={`/${sublink.toLowerCase().replace(/\s/g, '')}`}>
                          <span className="block py-1 hover:text-primary font-semibold">{sublink}</span>
                        </Link>
                      ))}
                    
                    </div>

                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={pathname === link.href ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav> 

        <div className="flex divide-x">
          <ModeToggle/>
        </div>
      </div>

    </header>
  );
}
