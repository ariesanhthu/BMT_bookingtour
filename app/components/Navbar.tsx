"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import seedData from '@/app/lib/seedData';

import { ModeToggle } from "./ModeToggle";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Sản phẩm", href: "/Tour", sublinks: ["Miền Bắc", "Miền Trung", "Miền Nam", "Khác"] },
  { name: "Liên hệ", href: "/Booking" },
  { name: "Ưu đãi", href: "/Discount" },
];

export default function Navbar() {
  
  const { isSignedIn } = useUser();
  
  const [homePageData, setHomePageData] = useState({
    _id: '',
    images: [] as string[],
    navbar: [
      {
        name: '',
        href: '',
        sublinks: [{ name: '', href: '' }]
      }
    ],
    logo: '',
    slogan: '',
    subSlogan: '',
    footer: {
      email: '',
      phone: '',
      address: '',
    },
  });
    
    // Lấy dữ liệu từ server
  const fetchHomePageData = async () => {
    try {
      const response = await fetch('/api/homepage');
      if (response.ok) {
        const data = await response.json();
        setHomePageData(data.data);
      } else {
        // Không có dữ liệu, tạo mới
        const newResponse = await fetch('/api/homepage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seedData),
        });
        const newData = await newResponse.json();
        setHomePageData(newData.data);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
  };
    
  useEffect(() => {
    fetchHomePageData();
  }, []);

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
              src="/logo.png"
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
          {homePageData.navbar.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.href)}
              onMouseLeave={handleMouseLeave}
            >
              {link.sublinks.length > 0 ? (
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
                        const sublinkHref = `/${sublink.href.toLowerCase().replace(/\s/g, '')}`;
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
                            {sublink.name}
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
        {!isSignedIn ? (
            <div className="flex gap-4">
                <div className="text-white btn rounded-lg bg-gray-950 py-2 px-4 hover:bg-gray-900 transition">
                    <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
                        Sign In
                    </SignInButton>
                </div>

                <div className="px-4 py-2 border-gray-950 border text-black rounded-lg hover:bg-gray-200 transition">
                    <SignUpButton signInFallbackRedirectUrl="/" fallbackRedirectUrl="/">
                        Sign Up
                    </SignUpButton>
                </div>
          </div>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
        <div className="flex items-center gap-4">
            <ModeToggle/>
        </div>
      </div>
    </header>
  );
}