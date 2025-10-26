import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/activateAccount";
import ResendActivation from "../components/Registration/ResendActivation";
import RequestPasswordReset from "../components/Registration/RequestPasswordReset";
import ResetPasswordConfirm from "../components/Registration/ResetPasswordConfirm";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import ProductDetail from "../pages/productDetail";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddProducts from "../pages/AddProducts";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes  */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="resend-activation" element={<ResendActivation />} />
        <Route path="reset-password" element={<RequestPasswordReset />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="shop/:productId" element={<ProductDetail />} />
      </Route>

      {/* Private Routes  */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="products/add" element={<AddProducts />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
