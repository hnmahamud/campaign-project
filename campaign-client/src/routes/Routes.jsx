import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyCampaign from "../pages/MyCampaign/MyCampaign";
import PrivateRoute from "./PrivateRoute";
import AddCampaign from "../pages/AddCampaign/AddCampaign";
import CampaignDetails from "../pages/CampaignDetails/CampaignDetails";
import AddProspect from "../pages/AddProspect/AddProspect";
import EditProspect from "../pages/EditProspect/EditProspect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/my-campaign",
        element: (
          <PrivateRoute>
            <MyCampaign></MyCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-campaign",
        element: (
          <PrivateRoute>
            <AddCampaign></AddCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "/campaign-details/:id",
        element: (
          <PrivateRoute>
            <CampaignDetails></CampaignDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-prospect",
        element: (
          <PrivateRoute>
            <AddProspect></AddProspect>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-prospect/:id",
        element: (
          <PrivateRoute>
            <EditProspect></EditProspect>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
