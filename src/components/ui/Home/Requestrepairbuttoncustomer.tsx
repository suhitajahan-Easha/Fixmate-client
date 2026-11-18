
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import RepairRequestForm from "./RepairRequestformCustomer";


type Props = {
  serviceId: string;
  basePrice: number;
};

export default function RequestRepairButton({ serviceId, basePrice }: Props) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const role = session?.user?.role;

  const handleRequest = () => {
    if (!session) {
      router.push(`/sign-in?callbackURL=${encodeURIComponent(`/services/${serviceId}`)}`);
      return;
    }

    if (role === "customer") {
      setShowForm(true);
    }
  };

  if (isPending) {
    return <button disabled className="w-full rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-600">Checking Account...</button>;
  }

  if (session && role !== "customer") {
    return (
      <div className="space-y-2">
        <button disabled className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-600">Request Repair</button>
        <p className="text-center text-sm text-gray-500">Only customers can request a repair.</p>
      </div>
    );
  }

  return (
    <>
      <button onClick={handleRequest} className=" rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
        Request Repair
      </button>

      {showForm && session?.user && (
        <div onClick={() => setShowForm(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
            <RepairRequestForm
              customerId={session.user.id}
              customerName={session.user.name}
              customerEmail={session.user.email}
              serviceId={serviceId}
              basePrice={basePrice}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
