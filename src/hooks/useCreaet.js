import { useState } from "react";
//rrd
import { useNavigate } from "react-router-dom";

//firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfige";
import toast from "react-hot-toast";
//loading
import { showLoading } from "react-global-loading";

export let useCreate = () => {
  let errorClass = {
    title: "",
    time: "",
    imgURL: "",
    ingredient: "",
    method: "",
  };
  let [preview, setPriview] = useState({
    title: "",
    time: "",
    method: "",
    price: "",
    ingredients: [],
    imgURLs: [],
    nation: "",
  });

  let [error, setError] = useState(errorClass);
  let navigate = useNavigate();
  let addDish = (dishData, newData) => {
    if (dishData) {
      if (
        !(dishData.title == "") &&
        !(dishData.time == "") &&
        !(newData.ingredients.length == 0) &&
        !(newData.imgURL.length == 0) &&
        !(dishData.method == "")
      ) {
        showLoading(true);
        addDoc(collection(db, "dishes"), {
          ...newData,
          createAt: serverTimestamp(),
        }).then(() => {
          toast.success(` Dishes added ${newData.title} `);
          showLoading(false);
          navigate("/");
        });
      }
    }
  };
  let chekInput = (dishData, newData) => {
    let newError = { ...errorClass };
    if (dishData.title == "") newError.title = "input-error";
    if (dishData.time == "") newError.time = "input-error";
    if (dishData.method == "") newError.method = "textarea-error";
    if (dishData.price == "") newError.price = "input-error";
    if (newData.ingredients.length == "0") newError.ingredient = "input-error";
    if (newData.imgURL.length == "0") newError.imgURL = "input-error";
    setError(newError);
  };
  let chekArr = (value, img) => {
    let newError = { ...errorClass };
    if (img == "") newError.imgURL = "input-error";
    if (value == "") newError.ingredient = "input-error";
    if (!(value == "")) newError.ingredient = "";
    if (!(img == "")) newError.imgURL = "";

    setError(newError);
  };
  let delteDoc = (dish) => {
    deleteDoc(doc(db, "dishes", dish.id));
    toast.error(`Delete dish -${dish.title}`);
  };

  let addPreview = (
    titleRef,
    methodRef,
    timeRef,
    priceRef,
    imgURLs,
    ingredients,
    selectRef
  ) => {
    setPriview({
      ...preview,
      title: titleRef.current.value,
      method: methodRef.current.value,
      time: timeRef.current.value,
      price: priceRef.current.value,
      imgURLs,
      ingredients,
      nation: selectRef.current.value,
    });
  };
  return { addDish, chekInput, error, chekArr, delteDoc, addPreview, preview };
};
