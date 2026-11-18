
export const uploadImage = async (imageFile: File): Promise<string> => {
  if (!imageFile.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error?.message || "Image upload failed.");
  }

  return data.data.display_url;
};
