// The Cloud Name and Upload Preset are taken from your Cloudinary account settings.
// These are safe to use in the frontend because the upload preset is "unsigned".
const CLOUD_NAME = "dqwcdteq3";
const UPLOAD_PRESET = "BookHive";

/**
 * Uploads a file to Cloudinary using an unsigned preset.
 * @param {File} file The file to upload (e.g., from an <input type="file">).
 * @returns {Promise<string|null>} The secure URL of the uploaded image, or null if the upload fails.
 */
export const uploadImage = async (file) => {
  // Create a FormData object to hold the file data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    // Send a POST request to the Cloudinary upload endpoint
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    // If the request was not successful, log the error and return null
    if (!response.ok) {
      console.error("Cloudinary upload failed:", response.statusText);
      return null;
    }

    // Parse the JSON response from Cloudinary
    const data = await response.json();

    // Return the secure URL of the uploaded image
    return data.secure_url;

  } catch (error) {
    console.error("Error uploading image:", error);
    return null; // Return null if there was a network error or other exception
  }
};