import React from "react";
import { fromatPrice } from "../utils";
import ListIngrediet from "./ListIngrediet";
function CreateModal({ dishPriveiw }) {
  let dish = dishPriveiw;
  console.log(dish);
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="bg-base-100 w-[90%] h-[90vh] rounded-3xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-20 pt-5 ">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="md:flex px-4">
                <div className="carousel carousel-center bg-neutral rounded-box max-w-xl md:w-96   space-x-4 p-4">
                  {dish.imgURLs.map((img, id) => {
                    return (
                      <div key={id} className="carousel-item ">
                        <img
                          src={img}
                          className="rounded-box object-contain "
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold  my-5 capitalize">
                  {dish.title}
                </h2>

                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold ">Price:</span>
                    <span className="pl-2">{fromatPrice(dish.price)}</span>
                  </div>
                  <div>
                    <span className="font-bold ">Time:</span>
                    <span className="pl-2">{dish.time}m</span>
                  </div>
                </div>
                <div className=" mb-4 flex items-center gap-2">
                  <span className="font-bold "> Nation:</span>
                  <p className=" text-lg ">{dish.nation}</p>
                </div>
                <div className="mb-4">
                  <ListIngrediet
                    ing={dish.ingredients}
                    size="font-bold  w-full -ml-1"
                  />
                </div>
                <div>
                  <span className="font-bold "> Cooking method:</span>
                  <p className=" text-sm mt-2">{dish.method}</p>
                </div>
                <div className=" flex gap-5 justify-between mt-8">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("my_modal_1")
                        .classList.remove("modal-open");
                    }}
                    className="btn btn-active"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      document
                        .getElementById("my_modal_1")
                        .classList.remove("modal-open");
                    }}
                    className="btn btn-accent "
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default CreateModal;
