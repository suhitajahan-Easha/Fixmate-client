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
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
      toast.error(data.message || "Failed to delete service");
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
      <AlertDialogTrigger className="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
        <Trash2 className="mr-1 h-4 w-4" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Service?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this service? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
