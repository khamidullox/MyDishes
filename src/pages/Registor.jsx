// react-router-doms
import { Form, Link, useActionData } from "react-router-dom";
//components
import FormInput from "../components/FormInput";
//react
import { useEffect } from "react";
//icons
import { IoLogoGoogle } from "react-icons/io5";
import { IoCreate } from "react-icons/io5";
//custom Hooks
import { useRegister } from "../hooks/useRegister";
import { useGoogle } from "../hooks/useGoogle";
export let action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let password = formData.get("password");
  let email = formData.get("email");
  return { email, password, photoURL, displayName };
};
function Registor() {
  let userData = useActionData();
  let { isPending, register, chekInput, error } = useRegister();
  useEffect(() => {
    if (userData) {
      let { email, password, photoURL, displayName } = userData;
      if (email && password && photoURL && displayName) {
        register(userData);
        chekInput(userData);
      } else {
        chekInput(userData);
      }
    }
  }, [userData]);
  let { handleGoogle } = useGoogle();

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className=" bg-cover h-screen absolute -z-10 opacity-90 object-cover w-full "
        src="/bg-login.mp4"
      ></video>
      <div className="aligen-content flex items-center justify-center h-screen place-items-center scroll-smooth  ">
        <div className=" flex flex-col items-center justify-center gap-5 card glass py-5 px-16 ">
          <h1 className=" font-bold text-4xl uppercase">Registor</h1>
          <Form
            method="post"
            className=" flex items-center justify-center flex-col  w-72"
          >
            <FormInput
              type="text"
              name="displayName"
              lebal="Dispaly Name"
              plecholder="Alex"
              size={error.displayName}
            />
            <FormInput
              type="url"
              lebal="Photo URL"
              plecholder="https//exemple.com"
              name="photoURL"
              size={error.photoURL}
            />
            <FormInput
              type="email"
              lebal="Email"
              plecholder="exemple@gmail.com"
              name="email"
              size={error.email}
            />
            <FormInput
              type="password"
              lebal="Password"
              name="password"
              plecholder="••••••"
              size={error.password}
            />
            {!isPending ? (
              <button className="btn btn-info w-full mt-5 ">
                <IoCreate /> Registor
              </button>
            ) : (
              <button disabled className="btn btn-info w-full mt-5 ">
                <IoCreate /> Loading..
              </button>
            )}
          </Form>
          <button
            onClick={() => {
              handleGoogle();
            }}
            className="btn btn-accent w-72"
          >
            <IoLogoGoogle /> Google
          </button>
          <p>
            Do you have an account?
            <Link
              className="link
             link-primary"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registor;
