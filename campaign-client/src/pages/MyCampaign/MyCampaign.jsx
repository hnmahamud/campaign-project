import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import CampaignCard from "./CampaignCard";
import Swal from "sweetalert2";

const MyCampaign = () => {
  const { user } = useAuth0();

  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/campaigns?email=${user?.email}`
      );
      return response.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_SERVER_API}/campaigns/${id}`)
          .then((data) => {
            if (
              data.data.campaignResult.deletedCount === 1 &&
              data.data.prospectResult.deletedCount > 0
            ) {
              refetch();
              Swal.fire("Deleted!", "Campaign has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen={false}></LoadingSpinner>;
  }

  return (
    <div className="w-[80%] mx-auto space-y-5">
      <Link
        to="/add-campaign"
        className="mt-5 btn btn-sm btn-outline normal-case"
      >
        <FaPlusCircle></FaPlusCircle>
        Add New
      </Link>

      {campaigns.length > 0 ? (
        <div className="space-y-5">
          <h3 className="text-center text-2xl font-bold">All Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {campaigns.map((singleCamp) => (
              <CampaignCard
                key={singleCamp._id}
                singleCamp={singleCamp}
                handleDelete={handleDelete}
              ></CampaignCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="alert rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Oops! No campaign create yet.</span>
        </div>
      )}
    </div>
  );
};

export default MyCampaign;
