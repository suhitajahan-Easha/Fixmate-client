
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HousePlug } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
            <HousePlug size={26} />
          </div>
          <span className="text-2xl font-bold text-gray-900">FixMate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/sign-in" className="text-gray-600 hover:text-blue-600">
            Sign In
          </Link>

          <Link href="/sign-up" className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 md:hidden" aria-label="Toggle navigation menu">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 border-t px-5 py-5 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`rounded-lg px-3 py-2 font-medium ${
                pathname === link.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/sign-in" onClick={() => setIsOpen(false)}>
            Sign In
          </Link>

          <Link href="/sign-up" onClick={() => setIsOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
