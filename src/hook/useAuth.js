import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());
  
  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  const handleApiError = (
    error,
    defaultMessage = "Something went wrong! Try Again ",
  ) => {
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get(`/auth/users/me`, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

  // update user profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return {
        success: true,
        message: "Profile Update Successfully.",
      };
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return {
        success: true,
        message: "Password Change Successfully.",
      };
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Resend activation handle
  const resendActivation = async (email) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/resend_activation/", {
        email: email,
      });
      return {
        success: true,
        message: "Activation email has been sent. Please check your email.",
      };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to resend activation email. Please try again.",
      );
    }
  };

  //Reset Password
  const resetPassword = async (email) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/reset_password/", { email });
      return {
        success: true,
        message: "Password reset instructions have been sent to your email",
      };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to send password reset email. Please try again",
      );
    }
  };

  //Reset Password Confirm
  const resetPasswordConfirm = async ({ uid, token, new_password }) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password,
      });
      return {
        success: true,
        message: "Password has been reset successfully. You can now login.",
      };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to reset password. Please try again",
      );
    }
  };

  //Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      //after login set user
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
      return { success: false };
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registrations Successfull.Check you email to activate you account.",
      };
    } catch (error) {
      return handleApiError(error, "Registration Failed. Please Try again...");
    }
  };

  // Logout user

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("cartId");
    
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resendActivation,
    resetPassword,
    resetPasswordConfirm,
  };
};

export default useAuth;
