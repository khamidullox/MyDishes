import { useDispatch, useSelector } from "react-redux";
import ListIngrediet from "../components/ListIngrediet";
import { fromatPrice } from "../utils";
import {
  deleteAll,
  deleteProductCart,
  minusAmout,
  plusAmout,
} from "../app/productSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalDelete from "../components/ModalDelete";
function Cart() {
  let { product, amout, price } = useSelector((state) => state.product);
  let dispatch = useDispatch();

  if (product.length > 0) {
    return (
      <div className="overflow-x-auto aligen-content my-10 pb-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>DIshes</th>
              <th>Ingredients</th>
              <th>Amout</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {product.map((dish) => {
              return (
                <tr key={dish.id}>
                  {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={dish.imgURL[0]} alt={dish.title} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="font-bold">{dish.title}</div>
                        <div className="text-sm opacity-50">{dish.nation}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ListIngrediet ing={dish.ingredients} size="hidden" />
                  </td>
                  <td className="flex gap-2 items-center  ">
                    <button
                      onClick={() => {
                        if (dish.amout > 1) {
                          dispatch(minusAmout(dish));
                        } else {
                          document
                            .getElementById("my_modal_2")
                            .classList.add("modal-open");
                        }
                      }}
                      className="btn btn-ghost"
                    >
                      -
                    </button>
                    <p>{dish.amout}</p>
                    <button
                      onClick={() => {
                        dispatch(plusAmout(dish));
                      }}
                      className="btn btn-ghost"
                    >
                      +
                    </button>
                    <ModalDelete dish={dish} list="amout" />
                  </td>
                  <th className="">
                    <p className=" font-medium ">
                      {dish.amout}x{fromatPrice(dish.price)}
                    </p>
                    <h4 className="pt-2 text-lg">
                      {fromatPrice(dish.amout * dish.price)}
                    </h4>
                  </th>
                  <td>
                    <button
                      onClick={() => {
                        document
                          .getElementById("my_modal_2")
                          .classList.add("modal-open");
                      }}
                      className="flex items-center  justify-center pl-4 btn"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              {/* <th></th> */}
              <th>Dishes</th>
              <th>Ingredients</th>
              <th>Total: {amout}</th>
              <th>
                Total Price
                <p className=" pt-1 text-base-content ">{fromatPrice(price)}</p>
              </th>
              <th>
                <button
                  onClick={() => {
                    document
                      .getElementById("my_modal_7")
                      .classList.add("modal-open");
                  }}
                  className=" badge badge-outline text-xs"
                >
                  Delete All
                </button>
                <dialog id="my_modal_7" className="modal">
                  <div className="modal-box text-base-content">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4 font-normal text-lg">
                      Are you sure you want to delete all ?
                    </p>
                    <div className="flex gap-2   justify-end items-center">
                      <button
                        onClick={() => {
                          document
                            .getElementById("my_modal_7")
                            .classList.remove("modal-open");
                        }}
                        className="btn  btn-info "
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteAll());
                          document
                            .getElementById("my_modal_7")
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
                          .getElementById("my_modal_7")
                          .classList.remove("modal-open");
                      }}
                    >
                      close
                    </button>
                  </form>
                </dialog>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center mt-52">
        <h2 className="md:text-3xl text-xl font-bold opacity-70">
          Your cart is so empty
        </h2>
      </div>
    );
  }
}

export default Cart;
