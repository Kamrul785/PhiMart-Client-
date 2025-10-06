import React from "react";

const ProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-center pt-4">
      {isEditing ? (
        <div className="space-x-4">
          <button
            type="submit"
            className="btn btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving" : "Save Chaanges"}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-primary px-8"
          onClick={() => setIsEditing(true)}
        >
          Edit Porfile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
