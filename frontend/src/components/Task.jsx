import { MdOutlineDelete } from "react-icons/md";
import { UserContext } from "../context/users/UserContext";
import { useContext, useEffect, useState } from "react";
import TableData from "./TableData";
import DropDown from "./DropDown";
import Badge from "./Badge";
import { statusList } from "../context/users/helper";

const Task = ({ task }) => {
  const context = useContext(UserContext);
  const { deleteTask, requestForApproval, isAdmin, getUserNameByID } = context;
  const { taskName, assignedTo, status } = task;

  const [newFormData, setNewFormData] = useState({
    newStatus: status,
  });

  const { newStatus } = newFormData;

  const [assignedToName, setAssignedToName] = useState("");

  useEffect(() => {
    const fetchAssignedUserName = async () => {
      if (isAdmin) {
        const userName = await getUserNameByID(assignedTo);
        setAssignedToName(userName);
      }
    };
    fetchAssignedUserName();
  }, [isAdmin, getUserNameByID, assignedTo]);

  return (
    <tbody className="divide-y divide-gray-200">
      <tr>
        <TableData value={taskName} />

        {isAdmin && (
          <>
            <TableData value={assignedToName} />
            <TableData value={<Badge title={status.toUpperCase()} />} />
            <TableData
              value={
                <button
                  onClick={() => deleteTask(task._id)}
                  type="button"
                  className=" text-red-600 hover:text-white hover:bg-red-600 disabled:pointer-events-none text-lg border-2 border-red-600 rounded-full p-1 ml-3"
                >
                  <MdOutlineDelete />
                </button>
              }
            />
          </>
        )}

        {!isAdmin && (
          <>
            <TableData
              value={
                <DropDown
                  value={newStatus.toUpperCase()}
                  updateValue={(value) =>
                    setNewFormData((prevState) => ({
                      ...prevState,
                      newStatus: value,
                    }))
                  }
                  optionList={statusList}
                />
              }
            />
            <TableData
              value={
                <button
                  onClick={() => {
                    requestForApproval(newStatus, task._id);
                  }}
                  type="submit"
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-[#e85d04] bg-[#ffee99] hover:bg-[#ffe14c] "
                >
                  Request for approval
                </button>
              }
            />
          </>
        )}
      </tr>
    </tbody>
  );
};
export default Task;
