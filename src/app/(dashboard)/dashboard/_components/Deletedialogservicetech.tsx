// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Trash2 } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";

// type Props = {
//   serviceId: string;
//   userId: string;
// };

// export default function DeleteServiceDialog({ serviceId, userId }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//       toast.error(data.message || "Failed to delete service");
//       return;
//     }
//       toast.success("Service deleted successfully!");
//       setOpen(false);
//       router.refresh();
//     } catch (error) {
//       console.error("Delete service error:", error);
//       toast.error("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger className="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
//         <Trash2 className="mr-1 h-4 w-4" />
//         Delete
//       </AlertDialogTrigger>

//       <AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg sm:max-w-md">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Delete Service?</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to delete this service? This action cannot be
//             undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         {error && <p className="text-sm text-red-600">{error}</p>}

//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
//           <Button
//             variant="destructive"
//             onClick={handleDelete}
//             disabled={loading}
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type Props = {
  serviceId: string;
  userId: string;
};

export default function DeleteServiceDialog({ serviceId, userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const { data, error } = await authClient.token();
    const token = data?.token;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        },
      );

      const ddata = await response.json();

      if (!response.ok) {
        toast.error(ddata.message || "Failed to delete service");
        return;
      }

      toast.success("Service deleted successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Delete service error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="inline-flex h-7 items-center justify-center rounded-md border border-[#45617F] bg-[#264669] px-3 text-xs font-medium text-white shadow-sm transition-colors hover:border-red-400 hover:bg-red-500/15 hover:text-red-300 sm:h-7 sm:text-sm">
        <Trash2 className="mr-1 h-4 w-4" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[calc(100%-1.5rem)] max-w-md rounded-xl border border-[#345071] bg-[#1B3658] text-white sm:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-white">
            Delete Service?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-gray-300">
            Are you sure you want to delete this service? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <AlertDialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel disabled={loading} className="w-full border-[#45617F] bg-transparent text-gray-200 hover:bg-[#264669] hover:text-white sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

