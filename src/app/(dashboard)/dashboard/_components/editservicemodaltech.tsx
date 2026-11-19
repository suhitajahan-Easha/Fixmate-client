// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Pencil } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Service } from "@/lib/type";

// type Props = {
//   service: Service;
//   userId: string;
// };

// export default function EditServiceModal({ service, userId }: Props) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const formData = new FormData(e.currentTarget);
//     const updatedService = Object.fromEntries(formData.entries());

//     const updateData = {
//       ...updatedService,
//       basePrice: Number(updatedService.basePrice),
//       userId,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/services/${service._id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updateData),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Failed to update service");
//         return;
//       }

//       setOpen(false);
//       router.refresh();
//     } catch (error) {
//       console.error("Update service error:", error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
//         <Pencil className="mr-1 h-4 w-4" />
//         Edit
//       </Button>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Edit Service</DialogTitle>
//             <DialogDescription>
//               Update your service information below.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={handleUpdate} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="title" className="text-sm font-medium">Service Title</label>
//               <Input id="title" name="title" defaultValue={service.title} required />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="category" className="text-sm font-medium">Category</label>
//               <select id="category" name="category" defaultValue={service.category} required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
//                 <option value="Smartphone">Smartphone</option>
//                 <option value="Laptop & PC">Laptop & PC</option>
//                 <option value="AC">AC</option>
//                 <option value="Refrigerator">Refrigerator</option>
//                 <option value="TV">TV</option>
//                 <option value="Washing Machine">Washing Machine</option>
//                 <option value="Electrical">Electrical</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="description" className="text-sm font-medium">Description</label>
//               <Textarea id="description" name="description" defaultValue={service.description} required rows={4} />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="image" className="text-sm font-medium">Image URL</label>
//               <Input id="image" name="image" type="url" defaultValue={service.image} required />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <label htmlFor="basePrice" className="text-sm font-medium">Base Price</label>
//                 <Input id="basePrice" name="basePrice" type="number" min="1" defaultValue={service.basePrice} required />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="estimatedDuration" className="text-sm font-medium">Estimated Duration</label>
//                 <Input id="estimatedDuration" name="estimatedDuration" defaultValue={service.estimatedDuration} required />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="serviceMode" className="text-sm font-medium">Service Mode</label>
//               <select id="serviceMode" name="serviceMode" defaultValue={service.serviceMode} required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
//                 <option value="Home Visit">Home Visit</option>
//                 <option value="Shop Drop-off">Shop Drop-off</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="serviceArea" className="text-sm font-medium">Service Area</label>
//               <Input id="serviceArea" name="serviceArea" defaultValue={service.serviceArea} required />
//             </div>

//             {error && <p className="text-sm text-red-600">{error}</p>}

//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Updating..." : "Save Changes"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
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
import { Service } from "@/lib/type";
import { uploadImage } from "@/lib/uploadImage";
import { authClient } from "@/lib/auth-client";

type Props = {
  service: Service;
  userId: string;
};

export default function EditServiceModal({ service, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(service.image);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!imageUrl) {
      setError("Please upload a service image.");
      toast.error("Please upload a service image.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const updatedService = Object.fromEntries(formData.entries());

    const updateData = {
      ...updatedService,
      image: imageUrl,
      basePrice: Number(updatedService.basePrice),
      userId,
    };

    try {
      console.log("1. Submit started");

      const { data, error } = await authClient.token();

      console.log("2. Token response:", data, error);

      const token = data?.token;

      console.log("3. Token:", token);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/${service._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      const ddata = await response.json();

      if (!response.ok) {
        setError(ddata.message || "Failed to update service");
        toast.error(ddata.message || "Failed to update service");
        return;
      }

      toast.success("Service updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update service error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="border-[#45617F] bg-[#264669] text-white hover:bg-blue-600 hover:text-white"
      >
        <Pencil className="mr-1 h-4 w-4" />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-1.5rem)] overflow-y-auto border-[#345071] bg-[#1B3658] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Edit Service
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Update your service information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-200"
              >
                Service Title
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={service.title}
                required
                className="border-[#45617F] bg-[#264669] text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-200"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={service.category}
                required
                className="h-10 w-full rounded-md border border-[#45617F] bg-[#264669] px-3 text-sm text-white outline-none focus:border-blue-500"
              >
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
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-200"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                defaultValue={service.description}
                required
                rows={4}
                className="border-[#45617F] bg-[#264669] text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="imageUpload"
                className="text-sm font-medium text-gray-200"
              >
                Service Image
              </label>

              {imageUrl && (
                <div className="overflow-hidden rounded-lg border border-[#45617F] bg-[#264669] p-2">
                  <img
                    src={imageUrl}
                    alt="Service preview"
                    className="h-40 w-full rounded-md object-cover sm:h-48"
                  />
                  <p className="mt-2 text-xs text-gray-300">
                    Current service image
                  </p>
                </div>
              )}

              <label
                htmlFor="imageUpload"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#45617F] bg-[#264669] px-4 py-5 text-center transition hover:border-blue-400 hover:bg-[#2B4D75]"
              >
                {imageUploading ? (
                  <>
                    <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
                    <span className="text-sm text-gray-200">
                      Uploading image...
                    </span>
                  </>
                ) : (
                  <>
                    <ImagePlus className="h-7 w-7 text-blue-400" />
                    <span className="text-sm font-medium text-white">
                      Choose a new image
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG, JPEG or WebP · Max 5MB
                    </span>
                  </>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading || loading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="basePrice"
                  className="text-sm font-medium text-gray-200"
                >
                  Base Price
                </label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  min="1"
                  defaultValue={service.basePrice}
                  required
                  className="border-[#45617F] bg-[#264669] text-white focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="estimatedDuration"
                  className="text-sm font-medium text-gray-200"
                >
                  Estimated Duration
                </label>
                <Input
                  id="estimatedDuration"
                  name="estimatedDuration"
                  defaultValue={service.estimatedDuration}
                  required
                  className="border-[#45617F] bg-[#264669] text-white focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="serviceMode"
                className="text-sm font-medium text-gray-200"
              >
                Service Mode
              </label>
              <select
                id="serviceMode"
                name="serviceMode"
                defaultValue={service.serviceMode}
                required
                className="h-10 w-full rounded-md border border-[#45617F] bg-[#264669] px-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="Home Visit">Home Visit</option>
                <option value="Shop Drop-off">Shop Drop-off</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="serviceArea"
                className="text-sm font-medium text-gray-200"
              >
                Service Area
              </label>
              <Input
                id="serviceArea"
                name="serviceArea"
                defaultValue={service.serviceArea}
                required
                className="border-[#45617F] bg-[#264669] text-white focus-visible:ring-blue-500"
              />
            </div>

            {error && <p className="text-sm text-red-300">{error}</p>}

            <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="w-full border-[#45617F] bg-transparent text-gray-200 hover:bg-[#264669] hover:text-white sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || imageUploading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
