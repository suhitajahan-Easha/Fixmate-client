
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Props = {
  serviceId: string;
};

export default function RequestRepairButton({ serviceId }: Props) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const role = session?.user?.role;

  const handleRequest = () => {
    if (!session) {
      router.push(
        `/sign-in?callbackURL=${encodeURIComponent(`/services/${serviceId}`)}`
      );
      return;
    }

    if (role === "customer") {
      // Next step: open the repair request form.
      console.log("Customer can request this service:", serviceId);
    }
  };

  if (isPending) {
    return (
      <button disabled className="w-full rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-600">
        Checking Account...
      </button>
    );
  }

  if (role && role !== "customer") {
    return (
      <div className="space-y-2">
        <button disabled className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-600">
          Request Repair
        </button>
        <p className="text-center text-sm text-gray-500">
          Only customers can request a repair.
        </p>
      </div>
    );
  }

  return (
    <button onClick={handleRequest} className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
      Request Repair
    </button>
  );
}
