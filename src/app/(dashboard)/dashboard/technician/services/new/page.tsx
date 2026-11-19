
// "use client";

// import Link from "next/link";
// import { ArrowLeft, Wrench, House, Store } from "lucide-react";
// import { toast } from "react-toastify";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export default function AddServicePage() {
//     const { data: session } = authClient.useSession();
//     const user = session?.user;
//     const router = useRouter();
//  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const form = e.currentTarget;

//   if (!user) {
//     toast.error("Please sign in first.");
//     return;
//   }

//   const formData = new FormData(e.currentTarget);
//   const serviceData = Object.fromEntries(formData.entries());

//   const newService = {
//     ...serviceData,
//     basePrice: Number(serviceData.basePrice),
//     technicianId: user.id,
//     technicianName: user.name,
//     technicianEmail: user.email,
//     approvalStatus: "pending",
//     isAvailable: true,
//   };

//   try {
//     // const { data: tokenData, error: tokenError } = await authClient.token();

//     // if (tokenError || !tokenData?.token) {
//     //   toast.error("Authentication failed. Please sign in again.");
//     //   return;
//     // }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${tokenData.token}`,
//       },
//       body: JSON.stringify(newService),
//     });

//     const result = await response.json();
    

//     if (!response.ok) {
//       throw new Error(result.message || "Failed to add service");
//     }

//     toast.success("Service submitted for approval!");

//     form.reset();
//     router.push("/dashboard/technician/services");
//   } catch (error) {
//     toast.error(error instanceof Error ? error.message : "Something went wrong!");
//   }
// };
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
//       <div className="mx-auto max-w-3xl">
//         <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600">
//           <ArrowLeft size={18} />
//           Back to Home
//         </Link>

//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Add New Service</h1>
//           <p className="mt-2 text-sm text-gray-500">Provide details about your repair service.</p>
//         </div>

//         <form onSubmit={handleAddService} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

//           {/* Service Information */}
//           <div>
//             <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
//               <Wrench size={20} className="text-blue-600" />
//               Service Information
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Service Title *</label>
//                 <input
//                   type="text"
//                   name="title"
//                   required
//                   placeholder="e.g. iPhone Screen Replacement"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Category *</label>
//                 <select
//                   name="category"
//                   required
//                   defaultValue=""
//                   className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 >
//                   <option value="" disabled>Select a category</option>
//                   <option value="Smartphone">Smartphone</option>
//                   <option value="Laptop & PC">Laptop & PC</option>
//                   <option value="AC">AC</option>
//                   <option value="Refrigerator">Refrigerator</option>
//                   <option value="TV">TV</option>
//                   <option value="Washing Machine">Washing Machine</option>
//                   <option value="Electrical">Electrical</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Description *</label>
//                 <textarea
//                   name="description"
//                   required
//                   rows={4}
//                   placeholder="Describe what your repair service includes..."
//                   className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Service Image URL *</label>
//                 <input
//                   type="url"
//                   name="image"
//                   required
//                   placeholder="Paste your service image URL"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//                 <p className="mt-1 text-xs text-gray-400">You can use an image URL for now. We'll add ImgBB later.</p>
//               </div>
//             </div>
//           </div>

//           {/* Pricing and Duration */}
//           <div className="border-t border-gray-100 pt-6">
//             <h2 className="mb-5 text-lg font-semibold text-gray-800">Pricing & Duration</h2>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Base Price (USD) *</label>
//                 <input
//                   type="number"
//                   name="basePrice"
//                   required
//                   min="1"
//                   step="0.01"
//                   placeholder="e.g. 50"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Estimated Duration *</label>
//                 <input
//                   type="text"
//                   name="estimatedDuration"
//                   required
//                   placeholder="e.g. 2-3 hours"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Service Availability */}
//           <div className="border-t border-gray-100 pt-6">
//             <h2 className="mb-5 text-lg font-semibold text-gray-800">Service Availability</h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-gray-700">Service Mode *</label>

//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
//                     <input type="radio" name="serviceMode" value="Home Visit" required className="accent-blue-600" />
//                     <House size={20} className="text-blue-600" />
//                     <span className="text-sm font-medium text-gray-700">Home Visit</span>
//                   </label>

//                   <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
//                     <input type="radio" name="serviceMode" value="Shop Drop-off" required className="accent-blue-600" />
//                     <Store size={20} className="text-blue-600" />
//                     <span className="text-sm font-medium text-gray-700">Shop Drop-off</span>
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">Service Area *</label>
//                 <input
//                   type="text"
//                   name="serviceArea"
//                   required
//                   placeholder="e.g. Dhanmondi, Dhaka"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Approval Notice */}
//           <div className="rounded-lg bg-blue-50 p-4">
//             <p className="text-sm font-semibold text-blue-800">Admin Approval Required</p>
//             <p className="mt-1 text-sm text-blue-700">
//               Your service will be submitted for admin approval. Customers can see it after approval.
//             </p>
//           </div>

//           <button
//             type="submit"
//             className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
//           >
//             <Wrench size={18} />
//             Submit Service for Approval
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wrench, House, Store, ImagePlus, LoaderCircle, X } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage";


export default  function AddServicePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageUrl("");
    setImageUploading(true);

    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      toast.success("Service image uploaded successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed!");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
   
    e.preventDefault();

    const form = e.currentTarget;

    if (!user) {
      toast.error("Please sign in first.");
      return;
    }

    if (imageUploading) {
      toast.info("Please wait until the image upload finishes.");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload a service image first.");
      return;
    }

    const formData = new FormData(form);
    const serviceData = Object.fromEntries(formData.entries());

    const newService = {
      ...serviceData,
      basePrice: Number(serviceData.basePrice),
      image: imageUrl,
      technicianId: user.id,
      technicianName: user.name,
      technicianEmail: user.email,
      approvalStatus: "pending",
      isAvailable: true,
    };
    
    try {
      const { data, error } = await authClient.token();
      const token = data?.token;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add service");
      }

      toast.success("Service submitted for approval!");

      form.reset();
      setImageUrl("");

      router.push("/dashboard/technician/services");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-blue-400">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Add New Service</h1>
          <p className="mt-2 text-sm text-gray-300">Provide details about your repair service.</p>
        </div>

        <form onSubmit={handleAddService} className="space-y-6 rounded-2xl border border-[#29415F] bg-[#1B3658] p-5 shadow-lg sm:p-8">

          {/* Service Information */}
          <div>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <Wrench size={20} className="text-blue-400" />
              Service Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Service Title *</label>
                <input type="text" name="title" required placeholder="e.g. iPhone Screen Replacement" className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Category *</label>
                <select name="category" required defaultValue="" className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20">
                  <option value="" disabled>Select a category</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop & PC">Laptop & PC</option>
                  <option value="AC">AC</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="TV">TV</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Description *</label>
                <textarea name="description" required rows={4} placeholder="Describe what your repair service includes..." className="w-full resize-none rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>

              {/* Service Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Service Image *</label>

                <div className="rounded-xl border border-dashed border-[#52749A] bg-[#264669] p-4 sm:p-5">
                  {imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-lg">
                        <img src={imageUrl} alt="Service preview" className="h-52 w-full rounded-lg object-cover sm:h-64" />
                        <button type="button" onClick={() => setImageUrl("")} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700" aria-label="Remove image">
                          <X size={17} />
                        </button>
                      </div>
                      <p className="text-center text-sm font-medium text-green-400">Image uploaded successfully</p>
                      <label className="block cursor-pointer text-center text-sm font-medium text-blue-400 transition hover:text-blue-300">
                        Change Image
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 py-5 text-center">
                      {imageUploading ? (
                        <LoaderCircle size={36} className="animate-spin text-blue-400" />
                      ) : (
                        <ImagePlus size={36} className="text-blue-400" />
                      )}

                      <div>
                        <p className="font-semibold text-white">{imageUploading ? "Uploading image..." : "Upload service image"}</p>
                        <p className="mt-1 text-xs text-gray-300">PNG, JPG or WEBP · Maximum 5MB</p>
                      </div>

                      {!imageUploading && (
                        <span className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                          Choose Image
                        </span>
                      )}

                      <input type="file" accept="image/*" disabled={imageUploading} onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Duration */}
          <div className="border-t border-[#345071] pt-6">
            <h2 className="mb-5 text-lg font-semibold text-white">Pricing & Duration</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Base Price (USD) *</label>
                <input type="number" name="basePrice" required min="1" step="0.01" placeholder="e.g. 50" className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Estimated Duration *</label>
                <input type="text" name="estimatedDuration" required placeholder="e.g. 2-3 hours" className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="border-t border-[#345071] pt-6">
            <h2 className="mb-5 text-lg font-semibold text-white">Service Availability</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-200">Service Mode *</label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#45617F] bg-[#264669] p-4 transition has-checked:border-blue-400 has-checked:bg-blue-500/10">
                    <input type="radio" name="serviceMode" value="Home Visit" required className="accent-blue-600" />
                    <House size={20} className="text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">Home Visit</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#45617F] bg-[#264669] p-4 transition has-checked:border-blue-400 has-checked:bg-blue-500/10">
                    <input type="radio" name="serviceMode" value="Shop Drop-off" required className="accent-blue-600" />
                    <Store size={20} className="text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">Shop Drop-off</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Service Area *</label>
                <input type="text" name="serviceArea" required placeholder="e.g. Dhanmondi, Dhaka" className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </div>

          {/* Approval Notice */}
          <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-4">
            <p className="text-sm font-semibold text-blue-300">Admin Approval Required</p>
            <p className="mt-1 text-sm text-gray-300">
              Your service will be submitted for admin approval. Customers can see it after approval.
            </p>
          </div>

          <button type="submit" disabled={imageUploading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {imageUploading ? <LoaderCircle size={18} className="animate-spin" /> : <Wrench size={18} />}
            {imageUploading ? "Uploading Image..." : "Submit Service for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}

