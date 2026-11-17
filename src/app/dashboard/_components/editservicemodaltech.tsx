
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
};

type Props = {
  service: Service;
  userId: string;
};

export default function EditServiceModal({ service, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const updatedService = Object.fromEntries(formData.entries());

    const updateData = {
      ...updatedService,
      basePrice: Number(updatedService.basePrice),
      userId,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${service._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update service");
        return;
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update service error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Pencil className="mr-1 h-4 w-4" />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update your service information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Service Title</label>
              <Input id="title" name="title" defaultValue={service.title} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select id="category" name="category" defaultValue={service.category} required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop & PC">Laptop & PC</option>
                <option value="AC">AC</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="TV">TV</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" name="description" defaultValue={service.description} required rows={4} />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input id="image" name="image" type="url" defaultValue={service.image} required />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="basePrice" className="text-sm font-medium">Base Price</label>
                <Input id="basePrice" name="basePrice" type="number" min="1" defaultValue={service.basePrice} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="estimatedDuration" className="text-sm font-medium">Estimated Duration</label>
                <Input id="estimatedDuration" name="estimatedDuration" defaultValue={service.estimatedDuration} required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="serviceMode" className="text-sm font-medium">Service Mode</label>
              <select id="serviceMode" name="serviceMode" defaultValue={service.serviceMode} required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="serviceArea" className="text-sm font-medium">Service Area</label>
              <Input id="serviceArea" name="serviceArea" defaultValue={service.serviceArea} required />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
