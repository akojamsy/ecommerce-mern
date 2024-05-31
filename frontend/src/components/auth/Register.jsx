import { useFormik } from "formik";
import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { registerSchema } from "../../utils/validators";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/authApiSlice";
import Loading from "../Loading";

const Register = ({ setAuthType }) => {
  const [vissible, setVissible] = useState(false);

  const dispatch = useDispatch();
  const [register, { isLoading, isError }] = useRegisterMutation();

  const onSubmit = async (values, { resetForm }) => {
    let formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const userData = await register(formData).unwrap();
      dispatch(setCredentials(userData));
      resetForm();
    } catch (error) {
      console.log(error);
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      cpassword: "",
      file: null,
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  console.log(values);
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12  sm:px-6 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Register as new user
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-5' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='fullname'
                className='block text-sm font-medium text-gray-700'
              >
                Fullname{" "}
                <span className='text-blue-600 text-[12px]'>
                  (firstname and Lastname)
                </span>
              </label>
              <div className='mt-1'>
                <input
                  type='fullname'
                  name='fullname'
                  id='fullname'
                  autoComplete='fullname'
                  placeholder='Enter your fullname'
                  value={values.fullname}
                  className={`appearance-none shadow-sm focus:ring-linkedin focus:border-linkedin focus:outline-none block w-full sm:text-sm border  rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.fullname && touched?.fullname
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors?.fullname && touched?.fullname && (
                  <span className='text-red-500 text-sm'>
                    {errors?.fullname}
                  </span>
                )}
              </div>
            </div>
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`appearance-none shadow-sm focus:ring-linkedin focus:border-linkedin focus:outline-none block w-full sm:text-sm border  rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.email && touched?.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className={`appearance-none shadow-sm focus:ring-linkedin focus:border-linkedin focus:outline-none block w-full sm:text-sm border  rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.password && touched?.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.password && touched?.password && (
                  <span className='text-red-500 text-sm'>
                    {errors?.password}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Comfirm Password
              </label>
              <div className='relative mt-1'>
                <input
                  type={`${!vissible ? "password" : "text"}`}
                  name='cpassword'
                  id='cpassword'
                  value={values.cpassword}
                  placeholder='confirm your password'
                  className={`appearance-none shadow-sm focus:ring-linkedin focus:border-linkedin focus:outline-none block w-full sm:text-sm border  rounded-md placedholder-gray-400 px-3 py-2 ${
                    errors?.cpassword && touched?.cpassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors?.cpassword && touched?.cpassword && (
                  <span className='text-red-500 text-sm'>
                    {errors?.cpassword}
                  </span>
                )}
              </div>
            </div>
            <div className='flex items-center'>
              <span className='inline-block h-10 w-10 rounded-full overflow-hidden'>
                {values?.file ? (
                  <img src={URL.createObjectURL(values.file)} alt='avatar' />
                ) : (
                  <RxAvatar size={42} />
                )}
              </span>
              <label
                htmlFor='file-input'
                className='px-3 py-2 text-[14px] text-gray-700 hover:bg-gray-50 bg-white shadow-sm ml-5 flex items-center jsutify-center border border-gray-300 rounded-md font-medium cursor-pointer'
              >
                <span>Upload photo</span>
                <input
                  type='file'
                  name='avatar'
                  id='file-input'
                  accept='[.jpg,.jpeg,.png]'
                  onChange={(event) => {
                    setFieldValue("file", event.target.files[0]);
                  }}
                  className='sr-only'
                />
              </label>
            </div>
            <div className='normalFlex justify-between'>
              <div className='normalFlex'>
                <input
                  type='checkbox'
                  name='remember-me'
                  id='remember-me'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded'
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
                className='text-blue-600 hover:text-blue-400 cursor-pointer text-[14px]'
              >
                Forget your password?
              </Link>
            </div>
            <div className='w-full'>
              <button
                type='submit'
                class='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-sm'
              >
                {!isLoading ? (
                  <span>Register</span>
                ) : (
                  <Loading label='Registering...' />
                )}
              </button>
            </div>
            <div className='normalFlex space-x-2'>
              <h4 className='text-[14px]'>Already have an account?</h4>
              <span
                onClick={() => setAuthType("login")}
                className='text-blue-600 hover:text-blue-400 text-[14px] hover:underline cursor-pointer
              '
              >
                Sign in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
