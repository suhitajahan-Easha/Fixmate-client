

"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { UserRound, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { uploadImage } from "@/lib/uploadImage";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    image: "",
    phone: "",
    area: "",
    bio: "",
  });

  // Load user information when the session becomes available
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        image: user.image || "",
        phone: user.phone || "",
        area: user.area || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setImageUploading(true);

      const imageUrl = await uploadImage(file);

      setProfile((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: profile.name,
      image: profile.image,
      phone: profile.phone,
      area: profile.area,
      bio: profile.bio,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to update profile!");
      return;
    }

    // Update the profile information immediately on this page
    setProfile({ ...profile });

    toast.success("Profile updated successfully!");
  };

  if (isPending) {
    return <p className="p-6 text-center text-white">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-6 text-center text-white">Please sign in first.</p>;
  }

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-blue-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Update Profile
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Manage your personal information.
          </p>
        </div>

        {/* Profile Preview */}
        <div className="mb-6 flex flex-col items-center gap-4 rounded-2xl border border-[#29415F] bg-[#1B3658] p-6 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-500 bg-[#264669]">
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={35} className="text-blue-400" />
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">
              {profile.name || "Your Name"}
            </h2>
            <p className="mt-1 text-sm text-gray-300">{user.email}</p>
            <span className="mt-2 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium capitalize text-blue-300">
              {user.role || "Customer"} Account
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#29415F] bg-[#1B3658] p-5 shadow-lg sm:p-8">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Profile Image
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Image Preview */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-500 bg-[#264669]">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={35} className="text-blue-400" />
                  )}
                </div>

                {/* Image Upload */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="w-full rounded-lg border border-[#345071] bg-[#264669] px-3 py-2.5 text-sm text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white hover:file:bg-blue-700"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    {imageUploading
                      ? "Uploading image..."
                      : "Choose an image (maximum 5MB)."}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="border-t border-[#345071] pt-5">
              <h2 className="mb-4 font-semibold text-white">
                Account Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-[#345071] bg-[#172F50] px-3 py-2.5 text-sm text-gray-400 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user.role || "customer"}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-[#345071] bg-[#172F50] px-3 py-2.5 text-sm capitalize text-gray-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border-t border-[#345071] pt-5">
              <h2 className="mb-4 font-semibold text-white">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-[#345071] bg-[#264669] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-[#345071] bg-[#264669] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Area / Location
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={profile.area}
                    onChange={handleChange}
                    placeholder="Enter your area"
                    className="w-full rounded-lg border border-[#345071] bg-[#264669] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write something about yourself..."
                    className="w-full resize-none rounded-lg border border-[#345071] bg-[#264669] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
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
