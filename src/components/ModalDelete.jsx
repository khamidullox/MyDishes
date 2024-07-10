import React from "react";
import { useCreate } from "../hooks/useCreaet";
import { useDispatch } from "react-redux";
import { deleteProductCart } from "../app/productSlice";
import toast from "react-hot-toast";
function ModalDelete({ dish, list }) {
  let { delteDoc } = useCreate();
  let dispatch = useDispatch();
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4 fon">
          Are you sure you want to delete{" "}
          <span className=" capitalize"> {dish.title}</span>?
        </p>
        <div className="flex gap-2   justify-end items-center">
          <button
            onClick={() => {
              document
                .getElementById("my_modal_2")
                .classList.remove("modal-open");
            }}
            className="btn  btn-info "
          >
            Back
          </button>
          <button
            onClick={() => {
              if (list == "deltedoc") {
                delteDoc(dish);
              }
              if (list == "amout") {
                toast.error(`Delet from cart ${dish.title}`);
                dispatch(deleteProductCart(dish));
              }
              document
                .getElementById("my_modal_2")
                .classList.remove("modal-open");
            }}
            className="btn btn-error "
          >
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            document
              .getElementById("my_modal_2")
              .classList.remove("modal-open");
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default ModalDelete;
