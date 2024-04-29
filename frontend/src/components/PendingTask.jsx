import { UserContext } from "../context/users/UserContext";
import { useContext, useEffect, useState } from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";

const PendingTask = ({ pendingTask, handleApprove, handleReject }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isAdmin, getUserNameByID } = context;
  const [assignedToName, setAssignedToName] = useState("");

  useEffect(() => {
    const fetchAssignedUserName = async () => {
      if (isAdmin) {
        const userName = await getUserNameByID(pendingTask.assignedTo);
        setAssignedToName(userName);
      }
    };
    fetchAssignedUserName();
  }, [isAdmin, pendingTask.assignedTo, getUserNameByID]);

  const handleApproveClick = () => {
    handleApprove(pendingTask._id, true);
    navigate("/tasks/pending");
  };

  const handleRejectClick = () => {
    handleReject(pendingTask._id);
  };

  return (
    <tbody className="divide-y divide-gray-200">
      <tr>
        <TableData value={pendingTask.taskName} />
        <TableData value={assignedToName} />
        <TableData value={pendingTask.status.toUpperCase()} />

        <TableData value={pendingTask.statusChangeRequest.newStatus} />
        <TableData
          value={
            <>
              <button
                className="border-[1px] border-green-900 text-green-900 bg-green-300 inline-flex items-center justify-center px-3 py-2 font-bold leading-none rounded-full mr-2 uppercase text-xs"
                onClick={handleApproveClick}
              >
                Approve
              </button>
              <button
                className="border-[1px] border-red-600  text-red-600 bg-red-200 inline-flex items-center justify-center px-3 py-2 font-bold leading-none rounded-full uppercase text-xs"
                onClick={handleRejectClick}
              >
                Reject
              </button>
            </>
          }
        />
      </tr>
    </tbody>
  );
};
export default PendingTask;
