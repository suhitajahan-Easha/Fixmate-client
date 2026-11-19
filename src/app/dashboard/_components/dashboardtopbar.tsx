"use client";

import Link from "next/link";
import Image from "next/image";
import { UserRound, House } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardTopbar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-20 animate-pulse bg-[#02112f]" />;
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#02112f] px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#345071] bg-[#1B3658] p-3 shadow-lg sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#45617F] bg-[#264669]">
            {user.image ? (
              <Image src={user.image} alt={user.name || "User"} fill sizes="44px" unoptimized className="object-cover" />
            ) : (
              <UserRound size={23} className="text-blue-300" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-white sm:text-base">{user.name}</h2>
            <p className="text-xs capitalize text-blue-400">{user.role || "User"}</p>
          </div>
        </div>

        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-xl bg-[#264669] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 sm:px-4">
          <House size={17} />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </div>
    </header>
  );
}