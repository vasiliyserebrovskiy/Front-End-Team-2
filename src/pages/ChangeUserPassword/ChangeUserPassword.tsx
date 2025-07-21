import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .matches(/[A-Z]/, "Minimum one capital letter")
    .matches(/[0-9]/, "Minimum one digit")
    .max(50, "Too Long!"),
});

export default function ChangeUserPassword() {
  const [errMessage, setErrMessage] = useState("");
  const { authUser, setSuccessMessage } = useAuthUser();
  const navigate = useNavigate();

  async function fetchChangePassword(password: string) {
    const res = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://fakerestaurantapi.runasp.net/api/User/${authUser?.usercode}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      }
    );

    if (res.ok) {
      setSuccessMessage("Password was successfully changed.");
      navigate("/profile");
    }

    if (!res.ok) {
      const resObj = await res.json();

      setErrMessage(
        "Change password error: status: " +
          res.status +
          ", message: " +
          resObj.message
      );
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-[20px] m-3">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {errMessage ? <div className="text-red-500">{errMessage}</div> : null}
      <div className="flex flex-col gap-[20px]">
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            setErrMessage("");
            fetchChangePassword(values.password);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center items-center w-[500px] gap-[20px] p-[50px] border-2 shadow-md border-gray-200 rounded-lg">
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

              <button
                type="submit"
                className="border w-[100px] border-gray-300 rounded-lg text-xl text-gray-800 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:translate-y-[1px] transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
