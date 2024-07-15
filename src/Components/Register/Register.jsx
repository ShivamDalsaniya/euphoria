import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../../../firebase";

function Register() {
  // State variables for form inputs and validation errors
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState(""); // State for user's email
  const [password, setPassword] = useState(""); // State for user's password
  const [errors, setErrors] = useState({}); // State for form validation errors


  // React Router's navigation hook
  const Navigate = useNavigate();

  // Function to validate form fields
  // const validate = () => {
  //   let tempErrors = {}; // Temporary object to hold validation errors

  //   // Validate name field
  //   if (!name.trim()) tempErrors.name = "Name is required.";

  //   // Validate email field
  //   if (!email.trim()) {
  //     tempErrors.email = "Email is required.";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     tempErrors.email = "Email is not valid.";
  //   }

  //   // Validate password field
  //   if (!password) {
  //     tempErrors.password = "Password is required.";
  //   } else if (password.length < 6) {
  //     tempErrors.password = "Password must be at least 6 characters.";
  //   }

  //   // Update state with validation errors
  //   setErrors(tempErrors);

  //   // Return true if there are no errors, otherwise false
  //   return Object.keys(tempErrors).length === 0;
  // };

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form inputs
    try {
      const result = await auth.createUserWithEmailAndPassword(email , password);
        await result.user.updateProfile({
          displayName : `${name}`,
        })
      alert(`Welcome ${result.user.email} ${result.user.displayName}`);
      Navigate('/Login')
    } catch (error) {
      alert(error.messsage);
    }

    e.target.reset();
  };

  // JSX structure for the Register component
  return (
    <>
      <section className="mt-5">
        <div className="max-w-[1240px] mx-auto">
          <div className="font-[sans-serif] bg-white text-white">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image section */}
              <div className="max-md:order-1 p-4">
                <img
                  src="https://readymadeui.com/signin-image.webp"
                  className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
                  alt="login-image"
                />
              </div>

              {/* Form section */}
              <div className="flex items-center md:p-8 p-6 bg-[#0C172C] lg:w-11/12 lg:ml-auto">
                <form
                  className="max-w-lg w-full mx-auto"
                  onSubmit={handleRegister} // Handle form submission
                >
                  <div className="mb-12">
                    <h3 className="text-3xl font-bold text-yellow-400">
                      Create an account
                    </h3>
                  </div>

                  {/* Name input field */}
                  <div>
                    <label className="text-xs block mb-2">Full Name</label>
                    <div className="relative flex items-center">
                      <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state on change
                        className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter name"
                      />
                      {errors.name && ( // Display name validation error if present
                        <span className="text-red-500 text-xs">
                          {errors.name}
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Email input field */}
                  <div className="mt-10">
                    <label className="text-xs block mb-2">Email</label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter email"
                      />
                      {errors.email && ( // Display email validation error if present
                        <span className="text-red-500 text-xs">
                          {errors.email}
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path d="M0 512h512V0H0Z" data-original="#000000" />
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit={10}
                            strokeWidth={40}
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          />
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Password input field */}
                  <div className="mt-10">
                    <label className="text-xs block mb-2">Password</label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter password"
                      />
                      {errors.password && ( // Display password validation error if present
                        <span className="text-red-500 text-xs">
                          {errors.password}
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Terms and conditions checkbox */}
                  <div className="flex items-center mt-8">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      I accept the
                      <NavLink
                        to=""
                        className="text-yellow-500 font-semibold hover:underline ml-1"
                      >
                        Terms and Conditions
                      </NavLink>
                    </label>
                  </div>

                  {/* Register button */}
                  <div className="mt-12">
                    <button
                      type="submit"
                      className="w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-yellow-400 border border-yellow-400 focus:outline-none"
                    >
                      Register
                    </button>
                    <p className="text-sm mt-8">
                      Already have an account?
                      <NavLink
                        to="/Login"
                        className="text-yellow-400 font-semibold hover:underline ml-1"
                      >
                        Login here
                      </NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
