import React, { useRef } from "react";
import {
  IconUpload,
  IconLoader2,
  IconEdit,
  IconPhotoOff,
} from "@tabler/icons-react";
import { useUploadFile } from "../../hooks/api/upload-image";
import { useUpdateProfile } from "../../hooks/api/profile/update";

export const ProfilePhotoUpload = ({
  currentPhoto,
  isOwnProfile,
  username,
  size = "large",
}: {
  currentPhoto: string | undefined;
  isOwnProfile: boolean;
  username?: string;
  size?: "large" | "small";
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const handleImageClick = () => {
    if (isOwnProfile && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFile(file);
      await updateProfile({ profilePicture: imageUrl });
    } catch (error) {
      console.error("Failed to upload profile photo:", error);
    }
  };

  const dimensions = size === "large" ? "w-32 h-32" : "w-24 h-24";

  // Static display for non-own profiles or during upload
  if (!isOwnProfile || isUploading) {
    return (
      <div className={`relative ${dimensions} rounded-full overflow-hidden`}>
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt={`${username}'s profile`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white border">
            <IconPhotoOff className="w-12 h-12 text-gray-300" />
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <IconLoader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Interactive upload component for own profile
  return (
    <div className="relative">
      <div
        onClick={handleImageClick}
        className={`relative ${dimensions} rounded-full cursor-pointer group overflow-hidden`}
      >
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Your profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white border-2 border-purple-500 rounded-full">
            <IconPhotoOff className="w-12 h-12 text-gray-300" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <IconUpload className="text-white" size={24} />
        </div>
      </div>

      <button
        className="absolute right-0 flex items-center p-2 text-white bg-purple-500 rounded-full bottom-2 hover:bg-purple-600"
        onClick={handleImageClick}
      >
        <IconEdit size={16} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
};
