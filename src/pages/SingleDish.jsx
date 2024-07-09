import { useParams } from "react-router-dom";
import { useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
//custom hooks
import { useCollection } from "../hooks/useCollection";
// fromat
import { fromatPrice } from "../utils";
//componenets
import LoadingData from "../components/LoadingData";
import ListIngrediet from "../components/ListIngrediet";
import { addProduct } from "../app/productSlice";
import toast from "react-hot-toast";

function SingleDish() {
  let { id } = useParams();
  let { user } = useSelector((state) => state.user);
  let { data } = useCollection("dishes", ["uid", "==", user.uid], ["createAt"]);
  let [countr, setCounter] = useState(1);
  let dispatch = useDispatch();
  let handleCounter = (mark) => {
    mark == "plus" ? setCounter(countr + 1) : setCounter(countr - 1);
  };

  if (data) {
    let filterDish = data.filter((item) => {
      return item.id == id;
    });
    return filterDish.map((dish) => {
      return (
        <div key={dish.id} className=" dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="md:flex px-4">
                <div className="carousel carousel-center bg-neutral rounded-box max-w-xl md:w-96   space-x-4 p-4">
                  {dish.imgURL.map((img, id) => {
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
                <div className="mt-5 flex gap-10 items-center   ">
                  <div className="flex gap-5 items-center w-32 rounded-xl ">
                    <button
                      onClick={() => handleCounter("minus")}
                      className="btn btn-success text-white"
                      disabled={countr == 1 ? true : false}
                    >
                      -
                    </button>
                    <p className="text-xl">{countr}</p>
                    <button
                      onClick={() => handleCounter("plus")}
                      className="btn btn-success text-white"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(addProduct({ ...dish, amout: countr }));
                        toast.success(
                          ` ${dish.title}(${countr}) add to cart 🛒`
                        );
                        setCounter(1);
                      }}
                      className="btn btn-info text-"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <LoadingData size="size-36" />;
  }
}

export default SingleDish;
