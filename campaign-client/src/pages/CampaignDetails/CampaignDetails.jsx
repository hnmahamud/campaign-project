import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FaPlusCircle, FaMailBulk } from "react-icons/fa";
import ProspectCard from "./ProspectCard";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const location = useLocation();
  const data = { pathname: location.pathname, id };

  const { data: singleCampaign = {}, isLoading: isCLoading } = useQuery({
    queryKey: ["single-campaign", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/single-campaign/${id}`
      );
      return response.data;
    },
  });

  const {
    data: prospects = [],
    isLoading: isPLoading,
    refetch,
  } = useQuery({
    queryKey: ["prospects", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/prospects?id=${id}&email=${
          user?.email
        }`
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
          .delete(`${import.meta.env.VITE_SERVER_API}/prospects/${id}`)
          .then((data) => {
            if (data.data.deletedCount === 1) {
              refetch();
              Swal.fire("Deleted!", "Class has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const sendEmail = async (id) => {
    if (prospects.length > 0) {
      const { value: dateTime } = await Swal.fire({
        title: "Select a Date and Time",
        html: `
          <input
            type="datetime-local"
            id="datetime"
            class="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300"
          />
        `,
        showCancelButton: true,
        preConfirm: () => {
          return document.getElementById("datetime").value;
        },
      });

      if (dateTime) {
        axios
          .post(
            `${import.meta.env.VITE_SERVER_API}/email-send?id=${id}&userEmail=${
              user?.email
            }&schedule=${dateTime}`
          )
          .then((data) => {
            if (data.data.status === true) {
              Swal.fire({
                icon: "success",
                title: "Sent!",
                html: 'Also check <span class="text-red-500">spam</span> folder.',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "You need to create prostates first.",
      });
    }
  };

  if (isCLoading || isPLoading) {
    return <LoadingSpinner fullScreen={false}></LoadingSpinner>;
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="card card-side bg-base-100 shadow-md rounded-md border mt-5">
        <div className="card-body">
          <h2 className="card-title">Campaign Title: {singleCampaign.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 my-5">
            <div>
              <p>
                <strong>Goal:</strong> {singleCampaign.goal}
              </p>
              <p>
                <strong>Criteria:</strong> {singleCampaign.criteria}
              </p>
            </div>
            <div>
              <p>
                <strong>Start Date:</strong> {singleCampaign.start_date}
              </p>
              <p>
                <strong>End Date:</strong> {singleCampaign.end_date}
              </p>
            </div>
          </div>
          <p>
            <strong>Content:</strong> {singleCampaign.content}
          </p>
        </div>
      </div>

      <div className="flex justify-between my-5">
        <Link
          to="/add-prospect"
          state={data}
          className="mt-5 btn btn-sm btn-outline normal-case"
        >
          <FaPlusCircle></FaPlusCircle>
          Add Prospect
        </Link>

        <button
          onClick={() => sendEmail(id)}
          className="mt-5 btn btn-sm btn-outline normal-case"
        >
          <FaMailBulk></FaMailBulk>
          Schedule Email
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prospects.length > 0 &&
              prospects.map((singleProspect) => (
                <ProspectCard
                  key={singleProspect._id}
                  singleProspect={singleProspect}
                  handleDelete={handleDelete}
                  data={data}
                ></ProspectCard>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetails;
