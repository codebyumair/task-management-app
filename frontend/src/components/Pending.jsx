import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/users/UserContext";
import { toast } from "react-toastify";
import TableHeading from "./TableHeading";
import PendingTask from "./PendingTask";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";

const Pending = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isAdmin, tasks, approvedStatusChange, getTasks } = context;
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (isAdmin) {
      const pendingTasks = tasks.filter((task) => task.statusChangeRequest);
      setPendingTasks(pendingTasks);
    } else {
      fetchData();
    }
  }, [tasks, getTasks, isAdmin]);

  const handleApprove = async (taskId, approved, newStatus) => {
    try {
      toast.info("Approving request...");
      await approvedStatusChange(taskId, approved, newStatus);

      toast.success("Request approved successfully");
    } catch (error) {
      toast.error("Failed to approve request");
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (taskId) => {
    try {
      navigate("/");
      toast.info("Rejecting request...");
      await approvedStatusChange(taskId, false);
      toast.success("Request rejected successfully");
    } catch (error) {
      toast.error("Failed to reject request");
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <header className="w-full p-5 bg-white flex justify-between ">
          <h1 className="text-2xl font-bold">Pending tasks</h1>
        </header>
        <div className="p-5 inline-block align-middle">
          {pendingTasks.length === 0 ? (
            <div className=" mt-14 w-full flex justify-center">
              <EmptyState />
            </div>
          ) : (
            <div className="overflow-hidden bg-white rounded-3xl">
              <table className="divide-y divide-gray-200">
                <thead>
                  <tr>
                    <TableHeading value="Task" />
                    <TableHeading value="Assignee" />
                    <TableHeading value="Requested Status" />

                    <TableHeading value="Action" />
                  </tr>
                </thead>
                {pendingTasks.map((task, index) => (
                  <PendingTask
                    key={task._id}
                    pendingTask={task}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                  />
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pending;
