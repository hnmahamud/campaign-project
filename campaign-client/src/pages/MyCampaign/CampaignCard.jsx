import { FaTrash, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CampaignCard = ({ singleCamp, handleDelete }) => {
  const { _id, title, goal, start_date, end_date } = singleCamp;

  return (
    <div className="card bg-base-100 shadow-lg rounded-md border">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Goal: {goal}</p>
        <div className="flex justify-between">
          <p>Start: {start_date}</p>
          <p>End: {end_date}</p>
        </div>
        <div className="mt-5 flex justify-between">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-outline"
          >
            <FaTrash></FaTrash>
          </button>
          <Link
            to={`/campaign-details/${_id}`}
            className="btn btn-xs btn-outline"
          >
            <FaArrowRight></FaArrowRight>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
