"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { UserRound, Save } from "lucide-react";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(user?.image || "");

  if (isPending) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-6 text-center">Please sign in first.</p>;
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: formDataObj.name as string,
      image: formDataObj.image as string,
      phone: formDataObj.phone as string,
      area: formDataObj.area as string,
      bio: formDataObj.bio as string,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Update Profile</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your personal information.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={handleUpdateProfile} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Profile Image</label>

              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50">
                  {image ? (
                    <img src={image} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <UserRound size={35} className="text-blue-600" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="url"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-400">Paste your profile image URL.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h2 className="mb-4 font-semibold text-gray-800">Account Information</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={user.role || "customer"}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm capitalize text-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h2 className="mb-4 font-semibold text-gray-800">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name || ""}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={user.phone || ""}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Area / Location</label>
                  <input
                    type="text"
                    name="area"
                    defaultValue={user.area || ""}
                    placeholder="Enter your area"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    defaultValue={user.bio || ""}
                    rows={4}
                    placeholder="Write something about yourself..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}