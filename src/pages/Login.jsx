import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { IoLogoGoogle } from "react-icons/io5";
import { useLogin } from "../hooks/useLogin";
import { useGoogle } from "../hooks/useGoogle";
export let action = async ({ request }) => {
  let formData = await request.formData();
  let password = formData.get("password");
  let email = formData.get("email");
  return { email, password };
};
function Login() {
  let data = useActionData();
  let { isPending, chekInput, error } = useLogin();
  let [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    if (data) {
      chekInput(data);
    }
  }, [data]);

  let { handleGoogle } = useGoogle();
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className=" bg-cover h-screen absolute -z-10 opacity-90 object-cover w-full "
        src="/bg-registor.mp4"
      ></video>
      <div className="aligen-content flex items-center justify-center h-screen place-items-center scroll-smooth  ">
        <div className=" flex flex-col items-center justify-center gap-5 card glass  py-5 px-16 ">
          <h1 className=" font-bold text-4xl uppercase">Login</h1>
          <Form
            method="post"
            className=" flex items-center justify-center flex-col  w-72"
          >
            <FormInput
              type="email"
              lebal="Email"
              plecholder="exemple@gmail.com"
              name="email"
              size={error.email}
            />
            {sendEmail && (
              <FormInput
                type="password"
                lebal="Password"
                name="password"
                plecholder="••••••••"
                size={error.password}
              />
            )}
            {sendEmail ? (
              isPending ? (
                <button disabled className="btn btn-disabled w-full mt-5">
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-5 ">
                  <LuLogIn />
                  Login
                </button>
              )
            ) : (
              <button className="btn btn-primary w-full mt-5 ">
                <LuLogIn />
                Send password
              </button>
            )}
          </Form>
          {sendEmail && (
            <button
              onClick={() => {
                handleGoogle();
              }}
              className="btn btn-accent w-72"
            >
              <IoLogoGoogle />
              Google
            </button>
          )}
          <p>
            Don't have an account?
            <Link
              className="link
             link-primary"
              to="/registor"
            >
              Registor
            </Link>
          </p>
          <p>
            Forgot your password?
            <button
              onClick={() => {
                setSendEmail(!sendEmail);
              }}
              className=" link link-info"
            >
              {" "}
              {sendEmail ? "Send Password" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
