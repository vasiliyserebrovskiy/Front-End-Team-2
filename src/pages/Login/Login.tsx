import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthUser } from "../../hooks/useAuthUser";
import type { User } from "../../types";

const SigninSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .matches(/[A-Z]/, "Minimum one capital letter")
    .matches(/[0-9]/, "Minimum one digit")
    .max(50, "Too Long!"),
});

interface Credentials {
  userEmail: string;
  password: string;
}

export default function Login() {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const { setAuthUser, setIsAuthorized, setSuccessMessage, successMessage } =
    useAuthUser();

  async function fetchSignin(credentials: Credentials) {
    const res = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://fakerestaurantapi.runasp.net/api/User/getusercode?UserEmail=${credentials.userEmail}&Password=${credentials.password}`
    );

    if (!res.ok) {
      const resObj = await res.json();
      setErrMessage(
        "Sign in error: status: " + res.status + ", message: " + resObj.message
      );
    }

    if (res.ok) {
      setSuccessMessage("");
      setMessage("Successfully logged in.");
      const resObj = await res.json();
      localStorage.setItem("usercode", resObj.usercode);
      localStorage.setItem("isAuthorized", "true");
      const authUser: User = {
        userEmail: credentials.userEmail,
        password: credentials.password,
        usercode: resObj.usercode,
      };
      setAuthUser(authUser);
      setIsAuthorized(true);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      navigate("/profile");
    }
  }

  const navigateToSignup = () => {
    navigate("/sign-up");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-[20px] m-3">
      <h2 className="text-2xl font-bold mb-6">Log In</h2>
      {message ? <div className="text-green-600">{message}</div> : null}
      {successMessage ? (
        <div className="text-green-600">{successMessage}</div>
      ) : null}
      {errMessage ? <div className="text-red-500">{errMessage}</div> : null}
      <div className="flex flex-col gap-[20px]">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SigninSchema}
          onSubmit={(values, { resetForm }) => {
            setErrMessage("");
            setMessage("");
            const data: Credentials = {
              userEmail: values.email,
              password: values.password,
            };
            fetchSignin(data);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center items-center w-[500px] gap-[20px] p-[50px] border-2 shadow-md border-gray-200 rounded-lg">
              <div className="flex justify-between w-[300px] ">
                <label className="text-xl font-semibold text-gray-800 mb-2">
                  Email:
                </label>
                <Field
                  name="email"
                  className="border shadow-md border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                />
              </div>
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}

              <div className="flex justify-between w-[300px]">
                <label className="text-xl font-semibold text-gray-800 mb-2">
                  Password:
                </label>
                <Field
                  name="password"
                  type="password"
                  className="border shadow-md border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                />
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <div className="flex gap-[20px]">
                <button
                  type="button"
                  onClick={navigateToSignup}
                  className="border w-[100px] border-gray-300 rounded-lg text-xl text-gray-800 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:translate-y-[1px] transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
                <button
                  type="submit"
                  className="border w-[100px] border-gray-300 rounded-lg text-xl text-gray-800 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:translate-y-[1px] transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
