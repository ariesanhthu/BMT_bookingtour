'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';

const links = [
    { name: "Role Management", href: "/admin/role" },
    { name:"User Management", href: "admin/user" },
    { name:"Customer Management", href: "admin/custmer" },
    { name:"Product Management", href: "admin/product" },
    { name:"Service Management", href: "admin/service" },
    { name:"Category Management", href: "admin/category" },
    { name:"Tag Management", href: "admin/tag" }
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