import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  // React hook form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newCampaign = {
      user_email: user?.email,
      title: data?.title,
      goal: data?.goals,
      criteria: data?.criteria,
      start_date: data?.start_date,
      end_date: data?.end_date,
      content: data?.content,
    };

    fetch(`${import.meta.env.VITE_SERVER_API}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          Swal.fire("Added!", "Campaign has been added.", "success");
          navigate("/my-campaign", { replace: true });
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
          Add a new campaign
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type title"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Goal
              </label>
              <select
                {...register("goals")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                required
              >
                <option value="Increase brand awareness">
                  Increase brand awareness
                </option>
                <option value="Drive product sales">Drive product sales</option>
                <option value="Engage with the target audience">
                  Engage with the target audience
                </option>
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Criteria
              </label>
              <select
                {...register("criteria")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                required
              >
                <option value="Fashion">Fashion</option>
                <option value="Beach vacations">Beach vacations</option>
                <option value="Outdoor activities">Outdoor activities</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Start Date
              </label>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  {...register("start_date")}
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Select date"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                End Date
              </label>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-5000"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  {...register("end_date")}
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Select date"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Content
              </label>
              <textarea
                {...register("content")}
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Campaign content here"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-50 border-gray-300 btn btn-outline btn-wide normal-case mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddCampaign;
