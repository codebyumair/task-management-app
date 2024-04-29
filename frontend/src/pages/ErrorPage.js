import { Link } from "react-router-dom";
import NotFound from "../assets/NotFound.jpg";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-white">
      <div className="container flex flex-col items-center ">
        <img src={NotFound} alt="404 Not found" style={{ width: "400px" }} />
        <div className="flex flex-col gap-6 max-w-md text-center">
          <Link
            to="/"
            className="px-8 py-4 text-xl font-semibold rounded bg-[#007dfe] text-gray-50 hover:text-gray-200"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ErrorPage;
