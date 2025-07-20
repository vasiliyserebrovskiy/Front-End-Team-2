import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthUser } from "../../hooks/useAuthUser";
import type { AuthUser } from "../../context/AuthContext";

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

// interface Usercode {
//   usercode: string;
// }

export default function Login() {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const { setAuthUser, setIsAuthorized } = useAuthUser();

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
      setMessage("Successfully logged in.");
      const usercode = await res.json();
      localStorage.setItem("usercode", usercode);
      localStorage.setItem("isAuthorized", "true");
      const authUser: AuthUser = {
        userEmail: credentials.userEmail,
        password: credentials.password,
        usercode: usercode,
      };
      setAuthUser(authUser);
      setIsAuthorized(true);

      //TODO: create navigation to user page
    }
  }

  const navigateToSignup = () => {
    navigate("/sign-up");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-[20px]">
      <h2>Log In</h2>
      {message ? <div className="text-green-600">{message}</div> : null}
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
            // console.log(values);
            const data: Credentials = {
              userEmail: values.email,
              password: values.password,
            };
            fetchSignin(data);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center items-center w-[500px] gap-[10px] p-[30px] border-2 rounded-[10px]">
              <div className="flex justify-between w-[300px] ">
                <label>Email:</label>
                <Field name="email" className="border" />
              </div>
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}

              <div className="flex justify-between w-[300px]">
                <label>Password:</label>
                <Field name="password" type="password" className="border" />
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <div className="flex gap-[20px]">
                <button
                  type="button"
                  onClick={navigateToSignup}
                  className="border w-[100px] rounded-[10px]"
                >
                  Sign Up
                </button>
                <button
                  type="submit"
                  className="border w-[100px] rounded-[10px]"
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
