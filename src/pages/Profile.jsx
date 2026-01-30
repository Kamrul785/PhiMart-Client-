import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileForm from "../components/Dashboard/Profle/ProfileForm.jsx";
import ProfileButton from "../components/Dashboard/Profle/ProfileButton.jsx";
import PasswordChangeForm from "../components/Dashboard/Profle/PasswordChangeForm.jsx";
import useAuthContext from "../hook/useAuthContext";
import ErrorAlert from "../components/ErrorAlert.jsx";
import { FiUser, FiLock, FiCheck, FiHome, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { user, updateUserProfile, changePassword, errorMsg } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };
      const response = await updateUserProfile(profilePayload);
      if (response.success) {
        setSuccessMsg(response.message);
      }
      if (data.current_password && data.new_password) {
        const response = await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        setSuccessMsg(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 animate-fade-in-up">
          <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
            <FiHome className="w-4 h-4" />
            Home
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Profile</span>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up">
            <ErrorAlert error={errorMsg} />
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in-up">
            <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Success!</h3>
              <p className="text-sm text-green-700">{successMsg}</p>
            </div>
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-xl">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                <p className="text-teal-100">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                  <FiUser className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                </div>
                <ProfileForm
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                />
              </div>

              {/* Password Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                  <FiLock className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-bold text-gray-900">Security</h2>
                </div>
                <PasswordChangeForm
                  register={register}
                  errors={errors}
                  watch={watch}
                  isEditing={isEditing}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <ProfileButton
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  isSubmitting={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">Can't find what you're looking for? Check our help center.</p>
            <Link to="#" className="text-teal-600 hover:text-teal-700 font-medium text-sm transition">Visit Help Center →</Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Privacy</h3>
            <p className="text-gray-600 text-sm mb-4">Your data is protected with industry-standard encryption.</p>
            <Link to="#" className="text-teal-600 hover:text-teal-700 font-medium text-sm transition">Privacy Policy →</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
