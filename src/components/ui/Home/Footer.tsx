import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { HousePlug, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/#about" },
];

const categories = [
  "Mobile Repair",
  "Laptop Repair",
  "AC Repair",
  "Refrigerator Repair",
  "TV Repair",
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl lg:px-5">
        {/* Logo and Description */}
        <div className="mb-5">
          <Link href="/" className="mb-3 flex w-fit items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600">
              <HousePlug size={26} />
            </div>
            <span className="text-2xl font-bold">FixMate</span>
          </Link>

          <p className="max-w-md text-sm leading-6 text-gray-300">
            Your trusted partner for home and device repairs. Quality service,
            right when you need it.
          </p>
        </div>

        {/* Social Links */}
        <div className="mb-6 flex items-center gap-4">
          <a href="#" aria-label="Facebook">
            <FaFacebookF size={19} />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram size={19} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn size={19} />
          </a>
          <a href="https://x.com" aria-label="X">
            <FaXTwitter size={19} />
          </a>
        </div>

        <div className="border-t border-gray-700 pt-6">
          {/* Explore */}
          <h3 className="mb-3 font-semibold">Explore</h3>
          <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-300">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Popular Services */}
          <h3 className="mb-3 font-semibold">Popular Services</h3>
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-md bg-[#263449] px-3 py-2 text-sm text-gray-300"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Contact */}
          <h3 className="mb-3 font-semibold">Contact Us</h3>
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
            <a
              href="mailto:support@fixmate.com"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Mail size={17} className="text-blue-400" />
              support@fixmate.com
            </a>

            <a
              href="tel:+8801XXXXXXXXX"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Phone size={17} className="text-blue-400" />
              +880 1XXX-XXXXXX
            </a>

            <div className="flex items-center gap-2">
              <MapPin size={17} className="text-blue-400" />
              Dhaka, Bangladesh
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} FixMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
