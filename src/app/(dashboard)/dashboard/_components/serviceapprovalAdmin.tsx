
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";

// type Props = {
//   serviceId: string;
//   userId: string;
// };

// export default function ServiceApprovalActions({ serviceId, userId }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleApproval = async (approvalStatus: "approved" | "rejected") => {
//     setLoading(true);
//         const { data, error } = await authClient.token();
//               const token = data?.token;

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             authorization:`Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             userId,
//             approvalStatus,
//           }),
//         }
//       );

//       const ddata = await response.json();

//       if (!response.ok) {
//         toast.error(ddata.message || "Failed to update service");
//         return;
//       }

//       toast.success(
//         approvalStatus === "approved"
//           ? "Service approved successfully!"
//           : "Service rejected successfully!"
//       );

//       router.refresh();
//     } catch (error) {
//       console.error("Service approval error:", error);
//       toast.error("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Button
//         size="sm"
//         className="bg-green-600 text-white hover:bg-green-700"
//         disabled={loading}
//         onClick={() => handleApproval("approved")}
//       >
//         {loading ? "Updating..." : "Approve"}
//       </Button>

//       <Button
//         size="sm"
//         variant="destructive"
//         disabled={loading}
//         onClick={() => handleApproval("rejected")}
//       >
//         Reject
//       </Button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type Props = {
  serviceId: string;
   approvalStatus: string;
};

export default function ServiceApprovalActions({ serviceId ,approvalStatus}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApproval = async (approvalStatus: "approved" | "rejected") => {
    setLoading(true);

    try {
      const { data, error } = await authClient.token();
      const token = data?.token;

      if (error || !token) {
        toast.error("Authentication failed. Please sign in again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${serviceId}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approvalStatus }),
        }
      );

      const ddata = await response.json();

      if (!response.ok) {
        toast.error(ddata.message || "Failed to update service");
        return;
      }

      toast.success(
        approvalStatus === "approved"
          ? "Service approved successfully!"
          : "Service rejected successfully!"
      );

      router.refresh();
    } catch (error) {
      console.error("Service approval error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="flex items-center gap-2">
  //     <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" disabled={loading} onClick={() => handleApproval("approved")}>
  //       {loading ? "Updating..." : "Approve"}
  //     </Button>
  //     <Button size="sm" variant="destructive" disabled={loading} onClick={() => handleApproval("rejected")}>
  //       {loading ? "Updating..." : "Reject"}
  //     </Button>
  //   </div>
  // );
  return (
  <>
    {approvalStatus === "pending" && (
      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" disabled={loading} onClick={() => handleApproval("approved")}>
          {loading ? "Updating..." : "Approve"}
        </Button>
        <Button size="sm" variant="destructive" disabled={loading} onClick={() => handleApproval("rejected")}>
          {loading ? "Updating..." : "Reject"}
        </Button>
      </div>
    )}
  </>
);
}
