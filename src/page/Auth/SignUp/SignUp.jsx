import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiMail, CiLock } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import "../style.css";
import { useFormik } from "formik";


import { postRegister } from "../../../Service/auth/apiMethod";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../validation";



const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postRegister(values);
        console.log(response, "response");
        if (response.status === "success") {
          navigate("/");
          console.log("hai", response);
        } else {
          console.log("hai", response.message);
        }
      } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      }
      formik.resetForm();
    },
  });

  return (
    <div className="w-full h-full flex md:flex-row">
      <div className="authentication_div_1 left_container">
        <div className="w-3/4  px-14 text-center ">
          <h1 className="text-5xl md:text-3xl font-bold text-white mb-4">
            Welcome Back!
          </h1>
          <p className="text-white mb-4 text-xl md:text-md font-light">
            To keep connected with us plase login with your personal info
          </p>
          <button type="button" className="auth_button"onClick={() => navigate("/")}>
            SIGN IN
          </button>
        </div>
      </div>
      <div className="authentication_div_2 ">
        <h1 className="text-4xl font-bold text-yellow mb-16">Create Account</h1>
        <form
          className="w-full max-w-sm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <AiOutlineUser className="text-gray-500 text-xl" />
              </div>
              <input
                type="text"
                id="name"
                className="input "
                placeholder="user"
                {...formik.getFieldProps("name")}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiMail className="text-gray-500 text-xl" />
              </div>
              <input
                type="text"
                id="email"
                className="input "
                placeholder="mail"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className=" mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiLock className="text-gray-500 text-xl" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="email"
                className="input "
                placeholder="password"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                onClick={PasswordVisibility}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 top-1`}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="task_button  w-3/5 h-12"
      
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
