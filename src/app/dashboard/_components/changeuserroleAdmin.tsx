
// "use client";

// type Props = {
//   userId: string;
//   currentRole: "customer" | "technician" | "admin";
//   loggedInUserId: string;
// };

// export default function ChangeUserRole({
//   userId,
//   currentRole,
//   loggedInUserId,
// }: Props) {
//   const isOwnAccount = userId === loggedInUserId;

//   return (
//     <select
//       value={currentRole}
//       disabled={isOwnAccount}
//       onChange={(e) => {
//         const newRole = e.target.value;
//         console.log("Change role to:", newRole);
//       }}
//       className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
//     >
//       <option value="customer">Customer</option>
//       <option value="technician">Technician</option>
//       <option value="admin">Admin</option>
//     </select>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  userId: string;
  currentRole: "customer" | "technician" | "admin";
  loggedInUserId: string;
};

export default function ChangeUserRole({
  userId,
  currentRole,
  loggedInUserId,
}: Props) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOwnAccount = userId === loggedInUserId;

  const handleRoleChange = async (newRole: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            role: newRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update user role");
        return;
      }

      setRole(newRole as Props["currentRole"]);

      toast.success("User role updated successfully!");

      router.refresh();
    } catch (error) {
      console.error("Role update error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={role}
      disabled={isOwnAccount || loading}
      onChange={(e) => handleRoleChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
    >
      <option value="customer">Customer</option>
      <option value="technician">Technician</option>
      <option value="admin">Admin</option>
    </select>
  );
}

