import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const EditProspect = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.state.pathname;

  const {
    data: prospect = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["single-prospect", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/single-prospect/${id}`
      );
      return response.data;
    },
  });

  // React hook form
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const editProspect = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
    };

    fetch(`${import.meta.env.VITE_SERVER_API}/prospects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProspect),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Prospect has been updated.", "success");
          refetch();
          navigate(pathname, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen={false}></LoadingSpinner>;
  }

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h3 className="text-center mb-4 text-2xl font-bold">Edit prospect</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                {...register("first_name")}
                defaultValue={prospect?.first_name}
                type="text"
                name="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type first name"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                {...register("last_name")}
                defaultValue={prospect?.last_name}
                type="text"
                name="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type last name"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                {...register("email")}
                defaultValue={prospect?.email}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type email"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-50 border-gray-300 btn btn-outline w-full normal-case mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProspect;
