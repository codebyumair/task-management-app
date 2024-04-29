import Empty from "../assets/Empty.jpg";

const EmptyState = () => {
  return (
    <div className="container w-fit h-fit py-16 flex flex-col items-center bg-white rounded-3xl">
      <img src={Empty} alt="No task found" style={{ width: "400px" }} />
      <p className="text-lg italic">No task found</p>
    </div>
  );
};
export default EmptyState;
