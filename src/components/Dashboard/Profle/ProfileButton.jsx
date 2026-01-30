import React from "react";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

const ProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-center gap-3 pt-6">
      {isEditing ? (
        <>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-2.5 rounded-lg transition transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiCheck className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition"
          >
            <FiX className="w-5 h-5" />
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-8 py-2.5 rounded-lg transition transform hover:scale-105 active:scale-100"
        >
          <FiEdit2 className="w-5 h-5" />
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
