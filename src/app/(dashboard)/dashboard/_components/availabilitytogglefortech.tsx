
// "use client";

// import { useState } from "react";

// export default function AvailabilityToggle({ initialValue }: { initialValue: boolean }) {
//   const [isAvailable, setIsAvailable] = useState(initialValue);

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         type="button"
//         onClick={() => setIsAvailable(!isAvailable)}
//         className={`relative h-6 w-11 rounded-full transition-colors ${isAvailable ? "bg-green-500" : "bg-gray-300"}`}
//       >
//         <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${isAvailable ? "left-6" : "left-1"}`} />
//       </button>
//       <span className={`text-sm font-medium ${isAvailable ? "text-green-600" : "text-gray-500"}`}>
//         {isAvailable ? "Available" : "Unavailable"}
//       </span>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  initialValue: boolean;
  serviceId: string;
  userId: string;
};

export default function AvailabilityToggle({ initialValue, serviceId, userId }: Props) {
  const [isAvailable, setIsAvailable] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const newValue = !isAvailable;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            isAvailable: newValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update availability");
        return;
      }

      setIsAvailable(newValue);
      toast.success(newValue ? "Service is now available" : "Service is now unavailable");
    } catch (error) {
      console.error("Availability update error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`relative h-6 w-11 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${isAvailable ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${isAvailable ? "left-6" : "left-1"}`} />
      </button>

      <span className={`text-sm font-medium ${isAvailable ? "text-green-600" : "text-gray-500"}`}>
        {loading ? "Updating..." : isAvailable ? "Available" : "Unavailable"}
      </span>
    </div>
  );
}

