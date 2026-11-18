// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { HousePlug } from "lucide-react";

// const links = [
//   { name: "Home", href: "/" },
//   { name: "Services", href: "/services" },
//   { name: "About", href: "/#about" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
//             <HousePlug size={26} />
//           </div>
//           <span className="text-2xl font-bold text-gray-900">FixMate</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden items-center gap-8 md:flex">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`rounded-lg px-4 py-2 font-medium transition ${
//                 pathname === link.href
//                   ? "bg-blue-600 text-white"
//                   : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           <Link href="/sign-in" className="text-gray-600 hover:text-blue-600">
//             Sign In
//           </Link>

//           <Link href="/sign-up" className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
//             Sign Up
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 md:hidden" aria-label="Toggle navigation menu">
//           {isOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="flex flex-col gap-4 border-t px-5 py-5 md:hidden">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setIsOpen(false)}
//               className={`rounded-lg px-3 py-2 font-medium ${
//                 pathname === link.href
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           <Link href="/sign-in" onClick={() => setIsOpen(false)}>
//             Sign In
//           </Link>

//           <Link href="/sign-up" onClick={() => setIsOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white">
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  HousePlug,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  UserRound,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "customer";

  const dashboard =
    role === "admin"
      ? "/dashboard/admin"
      : role === "technician"
        ? "/dashboard/technician"
        : "/dashboard/customer";

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && hash !== "#about";
    if (href === "/#about") return pathname === "/" && hash === "#about";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Signed out successfully!");
    setIsOpen(false);
    setIsProfileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    // <nav className="sticky top-0 z-50 bg-white shadow-sm">
    //   <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
    //     {/* Logo */}
    //     <Link href="/" className="flex items-center gap-2">
    //       <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
    //         <HousePlug size={26} />
    //       </div>
    //       <span className="text-2xl font-bold text-gray-900">FixMate</span>
    //     </Link>

    //     {/* Desktop Menu */}
    //     <div className="hidden items-center gap-4 md:flex">
    //       {links.map((link) => (
    //         <Link
    //           key={link.href}
    //           href={link.href}
    //           className={`rounded-lg px-4 py-2 font-medium transition ${
    //             isActive(link.href)
    //               ? "bg-blue-600 text-white"
    //               : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    //           }`}
    //         >
    //           {link.name}
    //         </Link>
    //       ))}

    //       {!isPending && !user && (
    //         <>
    //           <Link
    //             href="/sign-in"
    //             className="text-gray-600 transition hover:text-blue-600"
    //           >
    //             Sign In
    //           </Link>

    //           <Link
    //             href="/sign-up"
    //             className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
    //           >
    //             Sign Up
    //           </Link>
    //         </>
    //       )}

    //       {!isPending && user && (
    //         <div className="relative">
    //           <button
    //             onClick={() => setIsProfileOpen(!isProfileOpen)}
    //             className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 pr-3 outline-none transition hover:bg-gray-50"
    //           >
    //             <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
    //               {user.image ? (
    //                 <img
    //                   src={user.image}
    //                   alt={user.name || "User"}
    //                   className="h-full w-full object-cover"
    //                 />
    //               ) : (
    //                 user.name?.charAt(0)?.toUpperCase() || "U"
    //               )}
    //             </div>
    //             <span className="max-w-28 truncate text-sm font-medium text-gray-700">
    //               {user.name}
    //             </span>
    //             <ChevronDown size={16} className="text-gray-500" />
    //           </button>

    //           {isProfileOpen && (
    //             <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
    //               <div className="border-b border-gray-100 px-3 py-3">
    //                 <p className="truncate font-semibold text-gray-900">
    //                   {user.name}
    //                 </p>
    //                 <p className="truncate text-xs text-gray-500">
    //                   {user.email}
    //                 </p>
    //                 <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
    //                   {role}
    //                 </span>
    //               </div>

    //               <Link
    //                 href={dashboard}
    //                 onClick={() => setIsProfileOpen(false)}
    //                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 <LayoutDashboard size={16} />
    //                 Dashboard
    //               </Link>

    //               <Link
    //                 href="/dashboard/profile"
    //                 onClick={() => setIsProfileOpen(false)}
    //                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 <UserRound size={16} />
    //                 Update Profile
    //               </Link>

    //               <button
    //                 onClick={handleSignOut}
    //                 className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    //               >
    //                 <LogOut size={16} />
    //                 Sign Out
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>

    //     {/* Mobile Actions */}
    //     <div className="flex items-center gap-2 md:hidden">
    //       {!isPending && user && (
    //         <div className="relative">
    //           <button
    //             onClick={() => setIsProfileOpen(!isProfileOpen)}
    //             className="rounded-full outline-none"
    //             aria-label="Open profile menu"
    //           >
    //             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
    //               {user.name?.charAt(0)?.toUpperCase() || "U"}
    //             </div>
    //           </button>

    //           {isProfileOpen && (
    //             <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
    //               <div className="border-b border-gray-100 px-3 py-3">
    //                 <p className="truncate font-semibold text-gray-900">
    //                   {user.name}
    //                 </p>
    //                 <p className="truncate text-xs text-gray-500">
    //                   {user.email}
    //                 </p>
    //                 <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
    //                   {role}
    //                 </span>
    //               </div>

    //               <Link
    //                 href={dashboard}
    //                 onClick={() => setIsProfileOpen(false)}
    //                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 <LayoutDashboard size={16} />
    //                 Dashboard
    //               </Link>

    //               <Link
    //                 href="/dashboard/profile"
    //                 onClick={() => setIsProfileOpen(false)}
    //                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 <UserRound size={16} />
    //                 Update Profile
    //               </Link>

    //               <button
    //                 onClick={handleSignOut}
    //                 className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    //               >
    //                 <LogOut size={16} />
    //                 Sign Out
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       )}

    //       <button
    //         onClick={() => setIsOpen(!isOpen)}
    //         className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
    //         aria-label="Toggle navigation menu"
    //       >
    //         {isOpen ? <X size={24} /> : <Menu size={24} />}
    //       </button>
    //     </div>
    //   </div>

    //   {/* Mobile Menu */}
    //   {isOpen && (
    //     <div className="border-t border-gray-100 px-5 py-5 md:hidden">
    //       <div className="flex flex-col gap-3">
    //         {links.map((link) => (
    //           <Link
    //             key={link.href}
    //             href={link.href}
    //             onClick={() => setIsOpen(false)}
    //             className={`rounded-lg px-3 py-2 font-medium ${
    //               isActive(link.href)
    //                 ? "bg-blue-50 text-blue-600"
    //                 : "text-gray-700 hover:bg-gray-50"
    //             }`}
    //           >
    //             {link.name}
    //           </Link>
    //         ))}

    //         {!isPending && !user && (
    //           <>
    //             <Link
    //               href="/sign-in"
    //               onClick={() => setIsOpen(false)}
    //               className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
    //             >
    //               Sign In
    //             </Link>

    //             <Link
    //               href="/sign-up"
    //               onClick={() => setIsOpen(false)}
    //               className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
    //             >
    //               Sign Up
    //             </Link>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </nav>
    <nav className="sticky top-0 z-50 bg-[#111827] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
            <HousePlug size={26} />
          </div>
          <span className="text-2xl font-bold text-white">FixMate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                isActive(link.href)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!isPending && !user && (
            <>
              <Link
                href="/sign-in"
                className="text-gray-300 transition hover:text-blue-400"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}

          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-700 p-1.5 pr-3 outline-none transition hover:bg-white/10"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
                <span className="max-w-28 truncate text-sm font-medium text-gray-200">
                  {user.name}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="truncate font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                      {role}
                    </span>
                  </div>

                  <Link
                    href={dashboard}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserRound size={16} />
                    Update Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full outline-none"
                aria-label="Open profile menu"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="truncate font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                      {role}
                    </span>
                  </div>

                  <Link
                    href={dashboard}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserRound size={16} />
                    Update Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-200 hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-700 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-2 font-medium ${
                  isActive(link.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isPending && !user && (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-blue-400"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
