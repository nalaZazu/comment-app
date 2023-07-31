"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { SignUser } from "@/components/validation";
import { useDispatch } from "react-redux/es/exports";
import {signInReducer } from "@/redux/reducer";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const display =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const dispatch = useDispatch();
  const router = useRouter()
  let id = uuidv4();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              id: id,
              firstname: "",
              lastname: "",
              username: "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={SignUser}
            onSubmit={(values) => { 
              dispatch(signInReducer(values));
              router.push('/login')
            }}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="fistname"
                    className="block text-sm font-medium leading-6 text-primary"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={display}
                    />
                    {!!errors.firstname && (
                      <p className="text-xs text-red-600">{errors.firstname}</p>
                    )}
                  </div>
                </div>
                {/* last name */}
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-primary"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="lastname"
                      name="lastname"
                      type="text"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={display}
                    />
                    {!!errors.lastname && (
                      <p className="text-xs text-red-600">{errors.lastname}</p>
                    )}
                  </div>
                </div>
                {/* emaill */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-primary"
                  >
                    username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    
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
                    Sign in
                  </button>
                </div>
                <div></div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
