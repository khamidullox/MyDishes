import React, { useEffect, useRef, useState } from "react";
//rrd
import { Form, useActionData } from "react-router-dom";
//componenets
import { FormInput } from "../components";
import FormTeaxtarea from "../components/FormTeaxtarea";
import { useSelector } from "react-redux";
//firebase

//loading
import { GlobalLoading } from "react-global-loading";
import { useCreate } from "../hooks/useCreaet";
import ListIngrediet from "../components/ListIngrediet";
import FromSelect from "../components/FromSelect";
import CreateModal from "../components/CreateModal";
import { RiDeleteBin6Line } from "react-icons/ri";
//action
export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let time = formData.get("time");
  let method = formData.get("method");
  let ingredients = formData.get("ingredients");
  let imgURL = formData.get("imgURL");
  let nation = formData.get("nation");
  let price = formData.get("price");
  return { title, method, time, ingredients, imgURL, nation, price };
};
function Create() {
  let dishData = useActionData();
  //useRef
  let refIngredients = useRef();
  let refImg = useRef();
  let titleRef = useRef();
  let timeRef = useRef();
  let methodRef = useRef();
  let priceRef = useRef();
  let selectRef = useRef();
  //user
  let { user } = useSelector((state) => state.user);
  //useState
  let [ingredients, setIngredients] = useState([]);
  let [imgURLs, setImgURLs] = useState([]);

  let { addDish, chekInput, error, chekArr, addPreview, preview } = useCreate();

  // add array
  let addIngredient = () => {
    let newIngredient = refIngredients.current.value.trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
      refIngredients.current.value = "";
      chekArr(newIngredient);
    } else {
      refIngredients.current.value = "";
      chekArr(newIngredient);
    }
  };
  let addImgURL = () => {
    let newImgURL = refImg.current.value.trim();
    if (newImgURL && !imgURLs.includes(newImgURL)) {
      setImgURLs([...imgURLs, newImgURL]);
      refImg.current.value = "";
      chekArr(true, newImgURL);
    } else {
      refImg.current.value = "";
      chekArr(true, newImgURL);
    }
  };

  let newData = { ...dishData, ingredients, imgURL: imgURLs, uid: user.uid };
  useEffect(() => {
    if (dishData) {
      addDish(dishData, newData);
      chekInput(dishData, newData);
    }
  }, [dishData]);

  return (
    <div className="   flex w-full h-full items-center justify-center py-6   flex-col gap-2 ">
      <h1 className="text-2xl font-bold capitalize">Create new dish</h1>
      <Form
        className=" w-full flex items-center flex-col justify-center gap-3 max-w"
        method="post"
      >
        <FormInput
          lebal="Title:"
          plecholder="Example: Osh"
          size={` max-w-xl ${error.title}`}
          name="title"
          type="text"
          refInput={titleRef}
        />
        <div className="flex items-center justify-center max-w-xl gap-2 w-full">
          <FormInput
            lebal="Cooking time (m)"
            plecholder="Example: 60"
            size={`  ${error.time}`}
            name="time"
            type="number"
            refInput={timeRef}
          />
          <FormInput
            lebal="Price ($)"
            plecholder="Example: 10"
            size={`  ${error.price}`}
            name="price"
            type="number"
            refInput={priceRef}
          />
        </div>
        <FromSelect label="Nation" name="nation" refSelect={selectRef} />
        <div className="flex  items-end w-full justify-center  gap-1 ">
          <FormInput
            lebal="Ingredients:"
            plecholder="Example: meat "
            size={`  max-w-lg  ${error.ingredient} `}
            name="ingredients"
            type="text"
            refInput={refIngredients}
          />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addIngredient();
              }}
              className="btn btn-info  h-full"
            >
              add
            </button>
          </div>
        </div>
        <ListIngrediet ing={ingredients} />
        <div className="flex  items-end w-full justify-center  gap-1 ">
          <FormInput
            lebal="Image URL:"
            plecholder="Example: http://examole.com "
            size={`  max-w-lg ${error.imgURL}`}
            name="imgURL"
            type="URL"
            refInput={refImg}
          />
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                addImgURL();
              }}
              className="btn btn-info  h-full"
            >
              add
            </button>
          </>
        </div>
        {imgURLs.length >= 1 && (
          <ul className="flex items-center max-w-xl pl-1 w-full justify-start gap-3 flex-wrap mt-2">
            <li className=" text-lg">Images:</li>
            {imgURLs.map((item, id) => {
              return (
                <li key={id} className=" relative">
                  <img
                    className="  w-28  object-cover rounded-xl h-28"
                    src={item}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let filterImg = imgURLs.filter((img) => img !== item);
                      setImgURLs(filterImg);
                    }}
                    className="badge z-[1] badge-error  text-red-100 absolute -right-2 -top-2"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <FormTeaxtarea
          label="Method:"
          placeholder="Enter description"
          name="method"
          size={error.method}
          refTextarea={methodRef}
        />

        <div className=" flex justify-center gap-2 items-center">
          <button className="btn btn-accent max-w-3xl lg:w-72 md:w-72 sm:w-52 w-28 ">
            Apply
          </button>
          <button
            className="btn btn-secondary max-w-3xl lg:w-72 md:w-72 sm:w-52 w-28"
            onClick={(e) => {
              // e.preventDefault();
              // if (
              //   !(preview.title == "") &&
              //   !(preview.time == "") &&
              //   !(preview.method == "") &&
              //   !(preview.price == "") &&
              //   preview.ingredients.length > 0 &&
              //   preview.imgURLs.length > 0
              // ) {
              //   document
              //     .getElementById("my_modal_1")
              //     .classList.add("modal-open");
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
              // let ptivData = {
              //   title: preview.title,
              //   time: preview.time,
              //   // method: preview.method,
              //   price: preview.price,
              // };
              // chekInput(ptivData, newData);
              e.preventDefault();
              addPreview(
                titleRef,
                methodRef,
                timeRef,
                priceRef,
                imgURLs,
                ingredients,
                selectRef
              );
              if (
                preview.title &&
                preview.time &&
                preview.method &&
                preview.price &&
                preview.ingredients.length > 0 &&
                preview.imgURLs.length > 0
              ) {
                document
                  .getElementById("my_modal_1")
                  .classList.add("modal-open");
              }
              let previewData = {
                title: preview.title,
                time: preview.time,
                method: preview.method,
                price: preview.price,
              };
              chekInput(previewData, newData);
            }}
          >
            Preview
          </button>
          <CreateModal dishPriveiw={preview} />
          <GlobalLoading />
        </div>
      </Form>
    </div>
  );
}

export default Create;
