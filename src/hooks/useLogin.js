//firebase
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfige";

//react
import { useState } from "react";

//redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

//toast
import toast from "react-hot-toast";

export let useLogin = () => {
  let dispatch = useDispatch();
  let [isPending, setIsPending] = useState(false);
  let errorClass = {
    email: "",
    password: "",
  };
  let [error, setError] = useState(errorClass);
  let loginUser = async ({ email, password }) => {
    setIsPending(true);
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welocome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  let resetPassword = async ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  let chekInput = ({ email, password }) => {
    let newError = { ...errorClass };
    if (email && password) {
      loginUser({ email, password });
      setError(error);
    } else if (email && password == null) {
      resetPassword(data);
    }
    if (!email || !password) {
      if (!email) newError.email = "input-error";
      if (!password) newError.password = "input-error";
      setError(newError);
    }
    if (email && password) {
      setError(error);
    }
  };
  return { isPending, loginUser, resetPassword, chekInput, error };
};
