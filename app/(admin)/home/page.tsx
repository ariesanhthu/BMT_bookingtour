'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Layout from '../layout';
const links = [
    { name: "Role Management", href: "/role" },
    { name:"User Management", href: "/user" },
    { name:"Customer Management", href: "/custmer" },
    { name:"Product Management", href: "/product" },
    { name:"Service Management", href: "/service" },
    { name:"Category Management", href: "/category" },
    { name:"Order Management", href: "/orders" },
    { name:"Test Management", href: "/test" },
    { name:"HomePage Management", href: "/homePageContent" },
]

export default function AdminPage() {
    const pathname = usePathname();
    const [showSublist, setShowSublist] = useState(false);
    return (
        <div> 
            <nav>
            {links.map((link, idx) => (
                <div key={idx}>
                    <Link href={link.href}
                    className={pathname === link.href ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"}
                    >
                    {link.name}
                    </Link>
                </div>
            ))}     
            </nav>
        </div>
    );
}