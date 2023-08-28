import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Main = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner fullScreen={true}></LoadingSpinner>;
  }

  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
