import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiMail, CiLock } from "react-icons/ci";
import "../style.css";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import * as Yup from "yup";
import { postLogin } from "../../../Service/auth/apiMethod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slice/UserAuthSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .test("is-strong-password", "Password must be strong", (value) => {
      if (!value) return false;
      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordPattern.test(value);
    })
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postLogin(values);
        console.log(response, "response");
        if (response.status === "success") {
          toast.success(response.message);
          dispatch(loginSuccess({ data: response }));
          console.log("hai", response);

          navigate("/home");
        } else {
          console.log( response.message);
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
      <div className="authentication_div_2 ">
        <div className="text-center  ">
          <h1 className="text-4xl font-bold text-yellow mb-12 mx-10 ">
            Sign In to Your Account
          </h1>
        </div>

        <form
          className="w-full max-w-sm "
          onSubmit={formik.handleSubmit}
          noValidate
        >
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
          <div className="flex flex-col justify-center items-center">
            <p className="underline font-bold text-black mb-5">
              forgot Password?
            </p>

            <button type="submit" className="task_button  w-3/5 h-12">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <div className="authentication_div_1 left_container">
        <div className="w-3/4  px-16 text-center ">
          <h1 className="text-5xl md:text-3xl font-bold text-white mb-4">
            Hello Friend!
          </h1>
          <p className="text-white mb-4 text-xl md:text-md font-light">
            Enter your personal details and start your journey with us
          </p>
          <button
            type="button"
            className="auth_button"
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
