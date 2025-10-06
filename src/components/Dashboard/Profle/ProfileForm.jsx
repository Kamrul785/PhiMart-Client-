const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">First Name</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full rounded-lg"
          disabled={!isEditing}
          {...register("first_name", {
            required: "First Name is required",
          })}
        />
        {errors.first_name && (
          <p className="text-red-500">{errors.first_name.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label">Last Name</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full rounded-lg"
          disabled={!isEditing}
          {...register("last_name", { required: "Last Name is required" })}
        />
        {errors.last_name && (
          <p className="text-red-500">{errors.last_name.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label">Email Address</label>
        <input
          type="email"
          className="input input-bordered bg-base-200 w-full rounded-lg"
          disabled
          {...register("email")}
        />
      </div>

      <div className="form-control">
        <label className="label">Address</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full rounded-lg"
          disabled={!isEditing}
          {...register("address")}
        />
      </div>

      <div className="form-control">
        <label className="label">Phone number</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full rounded-lg"
          disabled={!isEditing}
          {...register("phone_number")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
