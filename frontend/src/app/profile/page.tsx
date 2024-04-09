"use client";

import { useState } from "react";

const ProfileEditPage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [mobile, setMobile] = useState("123-456-7890");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Here you can add logic to save the updated profile information
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile
          </label>
          <input
            type="tel"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="flex justify-end">
          {isEditing ? (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;
