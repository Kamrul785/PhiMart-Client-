import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div>
      Payment success. Return to <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default PaymentSuccess;
