import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const AddProspect = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state.id;
  const pathname = location.state.pathname;

  // React hook form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newProspect = {
      campaign_id: id,
      user_email: user?.email,
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
    };

    fetch(`${import.meta.env.VITE_SERVER_API}/prospects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProspect),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          Swal.fire("Added!", "Prospect has been added.", "success");
          navigate(pathname, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h3 className="text-center mb-4 text-2xl font-bold">
          Add new prospect
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                {...register("first_name")}
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

export default AddProspect;
