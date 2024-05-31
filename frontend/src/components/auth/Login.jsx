import { useFormik } from "formik";
import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// import { BiErrorCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validators";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setCredentials } from "../../redux/auth/authSlice";
import Loading from "../Loading";
import { message } from "antd";
import { useDispatch } from "react-redux";

const Login = ({ setAuthType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [vissible, setVissible] = useState(false);
  const [login, { isError, isLoading }] = useLoginMutation();

  const onSubmit = async (values, { resetForm }) => {
    const { data, error } = await login(values);
    if (error?.data?.message) {
      message.success(error?.data?.message);
      resetForm();
      return;
    }
    if (data) {
      resetForm();
      dispatch(setCredentials(data));
      navigate("/", { replace: true });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12  sm:px-6 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Login to your account
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md '>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-5' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <div className='mt-1'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  value={values.email}
                  placeholder='Enter your email address'
                  className={`appearance-none shadow-sm focus:ring-linkedin focus:border-linkedin focus:outline-none block w-full sm:text-sm border  rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.email && touched?.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors?.email && touched?.email && (
                  <span className='text-red-500 text-sm'>{errors?.email}</span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='relative mt-1'>
                <input
                  type={`${!vissible ? "password" : "text"}`}
                  name='password'
                  id='password'
                  value={values.password}
                  placeholder='Enter your password'
                  className={`appearance-none shadow-sm focus:ring-linkedin  focus:outline-none focus:border-linkedin block w-full sm:text-sm border rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.password && touched?.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors?.password && touched?.password && (
                  <span className='text-red-500 text-sm'>
                    {errors?.password}
                  </span>
                )}
                {/* {errors?.<BiErrorCircle className='text-red-500 absolute right-7 top-2.5' />} */}
                <span className='absolute right-2 top-2.5'>
                  {!vissible ? (
                    <HiOutlineEye
                      // color='#333'
                      className={`cursor-pointer  ${
                        errors?.password && touched?.password
                          ? "text-red-500"
                          : "text-[#333]"
                      }`}
                      onClick={() => setVissible(!vissible)}
                    />
                  ) : (
                    <HiOutlineEyeOff
                      // color='#333'
                      className={`cursor-pointer  ${
                        errors?.password && touched?.password
                          ? "text-red-500"
                          : "text-[#333]"
                      }`}
                      onClick={() => setVissible(!vissible)}
                    />
                  )}
                </span>
              </div>
            </div>
            <div className='normalFlex justify-between'>
              <div className='normalFlex'>
                <input
                  type='checkbox'
                  name='remember-me'
                  id='remember-me'
                  className='h-4 w-4 text-linkedin focus:ring-linkedin border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>
              <Link
                to='#'
                className='text-linkedin hover:text-blue-800 cursor-pointer text-[14px]'
              >
                Forget your password?
              </Link>
            </div>
            <div className='w-full '>
              <button
                type='submit'
                class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-sm'
              >
                {!isLoading ? (
                  <span>Login</span>
                ) : (
                  <Loading label='processing...' />
                )}
              </button>
            </div>
            <div className='normalFlex space-x-2'>
              <h4 className='text-[14px]'>Don't have an account?</h4>
              <span
                onClick={() => setAuthType("register")}
                className='text-linkedin hover:text-blue-800 text-[14px] hover:underline cursor-pointer
              '
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
