const cloud_name = "dwpos9xdo";
const upload_preset = "quickeats_upload";


export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const fileData = await res.json();

  if (!fileData.secure_url) {
    throw new Error("Upload failed");
  }

  return fileData.secure_url;
};
