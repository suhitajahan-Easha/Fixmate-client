
"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";

type Props = {
  image?: string | null;
  name: string;
};

export default function TechnicianAvatar({ image, name }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-400 bg-[#264669]">
      {image && !imageError ? (
        <Image src={image} alt={name} fill sizes="80px" unoptimized className="object-cover" onError={() => setImageError(true)} />
      ) : (
        <UserRound size={38} className="text-blue-300" />
      )}
    </div>
  );
}
