"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { LoginValidation } from "@/components/validation";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userNameReducer } from "@/redux/reducer";
const LoginUser = () => {
  const display =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const getData = useSelector((state: any) => state.login.user);
  console.log(getData, "login page");

  const router = useRouter();
  const id = uuidv4();
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              id: id,
              username: "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
              const data = getData.find((e: any) => {
                return e.username == values.username && e.password == values.password;
              });
              if (
                data?.username == values.username &&
                data?.password == values.password
              ) {
                router.push("/");
                dispatch(userNameReducer({username:data.username}));
              } else {
                toast.error("Enter Correct Email and password!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form className="space-y-6">
                {/* emaill */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-primary"
                  >
                   UserName 
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      className={display}
                    />
                    {!!errors.username && (
                      <p className="text-xs text-red-600">{errors.username}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-primary"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      className={display}
                    />
                    {!!errors.password && (
                      <p className="text-xs text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md !bg-gradient-to-l from-[#2152ff] to-[#21d4fd] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  "
                  >
                    Login
                  </button>
                </div>
                <div></div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      ;
    </>
  );
};

export default LoginUser;
