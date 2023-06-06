import React, { useEffect } from "react";
import {
  useValidateTokenQuery,
  useResendTokenMutation,
} from "../redux/api/authApiSlice";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const UserActivationPage = () => {
  const navigate = useNavigate();
  const { token, id } = useParams();

  const { isLoading, isError } = useValidateTokenQuery({
    token,
    id,
  });

  const [
    resendToken,
    { error, isError: resendTokenError, isLoading: resendLoading },
  ] = useResendTokenMutation();

  const handleResendToken = async () => {
    try {
      const data = await resendToken({ id }).unwrap();
      if (data?.success === true) {
        message.success(data?.message);
        navigate("/auth", { replace: true });
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-300'>
        <Loading label='Checking activation token...' />
      </div>
    );
  }

  return (
    <div>
      {isError ? (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-200'>
          <h5 className='text-md text-linkedin'>
            Oops!! Your token has expired.
          </h5>
          <button
            type='button'
            className={`text-white mt-5 bg-linkedin hover:bg-blue-600 focus:ring-1 focus:ring-linkedin font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-200 transition-all ${
              resendLoading && "disabled:bg-blue-400"
            }`}
            // disabled={resendLoading}
            onClick={handleResendToken}
          >
            {!resendLoading ? (
              <span>Resend Token</span>
            ) : (
              <Loading label='Sending activation token...' />
            )}
          </button>
        </div>
      ) : (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-200'>
          <h5 className='text-md text-linkedin'>
            Your account has been activated successfully.
          </h5>
          <button
            type='button'
            class='text-white mt-5 bg-linkedin hover:bg-blue-600 focus:ring-1 focus:ring-linkedin font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-200 transition-all'
            onClick={() => navigate("/auth", { replace: true })}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActivationPage;
