// "use client";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { ModeToggle } from "./ModeToggle";

// const links = [
//   { name: "Trang chủ", href: "/" },
//   { name: "Giới thiệu", href: "/about" },
//   { name: "Sản phẩm", href: "/Tour", sublinks: ["Miền Bắc", "Miền Trung", "Miền Nam", "Khác"] },
//   { name: "Đặt vé", href: "/Booking" },
//   { name: "Ưu đãi", href: "/Discount" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [showSublist, setShowSublist] = useState(false);

//   const handleMouseEnter = () => {
//     setShowSublist(true);
//   };

//   const handleMouseLeave = () => {
//     setShowSublist(false);
//   };

//   return (
//     <header className="mb-8 border-b p-5">
//       <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
//         <div>
//           <div className="flex gap-5">
//             <div className="w-9 h-9 relative">

//               <Image 
//                 src= {'/logo.jpg'}
//                 alt = "logo"
//                 // width={60}
//                 // height={60}
//                 fill
//                 className="object-cover object-center"
                
//                 />
//               </div>
//             <h1 className="text-2xl md:text-xl font-bold">
//               <Link href="/">
//               BLUE MOON<span className="text-primary">LIGHT</span>
//               </Link>
//             </h1>
//           </div>
//         </div>
        
//         <nav className="hidden gap-12 lg:flex 2xl:ml-16">
//           {links.map((link, idx) => (
//             <div key={idx}>
//               {link.sublinks ? (
//                 <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

//                   <span className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary cursor-pointer ${showSublist ? 'text-primary' : 'text-gray-600'}`}>
//                     {link.name}
//                   </span>
                  
//                   {showSublist && (

//                     <div className="absolute top-full left-0 py-2 px-4 shadow-xl bg-opacity-50 bg-black rounded-lg z-10 w-32">
                    
//                       {link.sublinks.map((sublink, index) => (
//                         <Link key={index} href={`/${sublink.toLowerCase().replace(/\s/g, '')}`}>
//                           <span className="block py-1 hover:text-primary font-semibold">{sublink}</span>
//                         </Link>
//                       ))}
                    
//                     </div>

//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   href={link.href}
//                   className={pathname === link.href ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"}
//                 >
//                   {link.name}
//                 </Link>
//               )}
//             </div>
//           ))}
//         </nav> 
//         <div className="flex divide-x">
//           <ModeToggle/>
//         </div>
//       </div>

//     </header>
//   );
// }
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ModeToggle } from "./ModeToggle";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Sản phẩm", href: "/Tour", sublinks: ["Miền Bắc", "Miền Trung", "Miền Nam", "Khác"] },
  { name: "Đặt vé", href: "/Booking" },
  { name: "Ưu đãi", href: "/Discount" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (href: string) => {
    setActiveDropdown(href);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl">
        <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-90">
          <div className="relative w-9 h-9 overflow-hidden rounded-lg">
            <Image 
              src="/logo.jpg"
              alt="logo"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-xl font-bold">
            BLUE MOON<span className="text-primary">LIGHT</span>
          </h1>
        </Link>
        
        <nav className="hidden gap-8 lg:flex 2xl:ml-16">
          {links.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.href)}
              onMouseLeave={handleMouseLeave}
            >
              {link.sublinks ? (
                <>
                  <span 
                    className={`text-lg font-semibold transition duration-200 cursor-pointer ${
                      isLinkActive(link.href) || activeDropdown === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </span>
                  
                  {activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 py-2 px-4 bg-card rounded-lg shadow-lg border z-50 min-w-[140px]">
                      {link.sublinks.map((sublink) => {
                        const sublinkHref = `/${sublink.toLowerCase().replace(/\s/g, '')}`;
                        return (
                          <Link
                            key={sublinkHref}
                            href={sublinkHref}
                            className={`block py-2 px-2 rounded-md text-sm font-medium transition duration-200 ${
                              isLinkActive(sublinkHref)
                                ? "text-primary bg-muted"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            }`}
                          >
                            {sublink}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`text-lg font-semibold transition duration-200 ${
                    isLinkActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
            <ModeToggle/>
        </div>
      </div>
    </header>
  );
}