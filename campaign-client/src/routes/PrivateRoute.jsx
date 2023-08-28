import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth0();

  // if user is not available then return
  if (isLoading) {
    return <LoadingSpinner fullScreen={true}></LoadingSpinner>;
  }

  // if user is logged in then go to private target page
  if (user) {
    return children;
  }

  // if user is not logged in then don't go to private target page. Navigate login page
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
