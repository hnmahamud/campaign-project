import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProspectCard = ({ singleProspect, handleDelete, data }) => {
  const { _id, first_name, last_name, email } = singleProspect;
  return (
    <tr className="hover">
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{email}</td>
      <td>
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-outline"
          >
            <FaTrash></FaTrash>
          </button>
          <Link
            to={`/edit-prospect/${_id}`}
            state={data}
            className="btn btn-xs btn-outline"
          >
            <FaEdit></FaEdit>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProspectCard;
