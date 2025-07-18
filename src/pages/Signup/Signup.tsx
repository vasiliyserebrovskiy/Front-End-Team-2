import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
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

export default function Signup() {
  const [message, setMessage] = useState("");

  async function fetchSignup(credentials: Credentials) {
    const res = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://fakerestaurantapi.runasp.net/api/User/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (res.ok) {
      setMessage("Successfully registered");
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-[20px]">
      <h2>Sign Up</h2>
      {message ? <div>{message}</div> : null}
      <div className="flex flex-col gap-[20px]">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            const data: Credentials = {
              userEmail: values.email,
              password: values.password,
            };
            fetchSignup(data);
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

              <button type="submit" className="border w-[100px] rounded-[10px]">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
