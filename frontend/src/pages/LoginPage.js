import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/users/UserContext";
import FormField from "../components/FormField";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <FormField
                  title="Email"
                  inputValue={email}
                  updateValue={(value) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <FormField
                  title="Password"
                  inputValue={password}
                  updateValue={(value) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#007dfe] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-5 text-center text-sm">
              <Link
                to="/signup"
                className="font-medium text-[#007dfe] hover:text-blue-900"
              >
                Didn't have an account? Create now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
