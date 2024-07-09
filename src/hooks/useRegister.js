//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfige";

//react
import { useState } from "react";

//redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

//toast

export let useRegister = () => {
  let errorClass = {
    email: "",
    password: "",
    photoURL: "",
    displayName: "",
  };
  let [error, setError] = useState(errorClass);
  let inptErr = "input-error";

  let dispatch = useDispatch();
  let [isPending, setIsPending] = useState(false);
  let register = async ({ email, password, photoURL, displayName }) => {
    setIsPending(true);
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      let user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  let chekInput = ({ email, password, photoURL, displayName }) => {
    let newError = { ...errorClass };
    if (!email) newError.email = "input-error";
    if (!password) newError.password = "input-error";
    if (!photoURL) newError.photoURL = "input-error";
    if (!displayName) newError.displayName = "input-error";

    setError(newError);

    if (email && password && photoURL && displayName) {
      setError(errorClass);
    }
  };
  return { isPending, register, chekInput, error };
};
// e.preventDefault();
// console.log(preview);
// if (!(preview.title == "")) {
//   document.getElementById("my_modal_1").showModal();
// } else {
//   let ptivData = {
//     title: preview.title,
//     time: preview.time,
//     method: preview.method,
//     price: preview.price,
//   };
//   chekInput(ptivData, newData);
// }
// addPreview(
//   titleRef,
//   methodRef,
//   timeRef,
//   priceRef,
//   imgURLs,
//   ingredients,
//   selectRef
// );
