import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? children : <Navigate to={"/login"} />;
};
