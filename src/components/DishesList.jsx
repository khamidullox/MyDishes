//redux
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//custom hook
import { useCollection } from "../hooks/useCollection";
import { useCreate } from "../hooks/useCreaet";
// react icon
import { MdTimer } from "react-icons/md";
import { GiSadCrab } from "react-icons/gi";
import { IoIosPricetag } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
//componenets
import ListIngrediet from "./ListIngrediet";
import LoadingData from "./LoadingData";
import { fromatPrice } from "../utils";
import ModalDelete from "./ModalDelete";

function DishesList() {
  let { user } = useSelector((state) => state.user);
  let { data } = useCollection("dishes", ["uid", "==", user.uid], ["createAt"]);
  let { delteDoc } = useCreate();

  if (data) {
    if (data.length > 0) {
      return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
          {data.reverse().map((dish) => {
            return (
              <div key={dish.id} className=" relative">
                <button
                  onClick={() => {
                    document
                      .getElementById("my_modal_2")
                      .classList.add("modal-open");
                  }}
                  className=" badge z-[1] badge-error py-3 text-red-100 absolute right-8 top-6"
                >
                  <RiDeleteBin6Line />
                </button>
                <ModalDelete dish={dish} list="deltedoc" />
                <Link
                  to={`/singleDish/${dish.id}`}
                  className="card bg-base-100 max-w-96 shadow-lg hover:shadow-2xl  glass h-[500px] "
                >
                  <div className="card-body">
                    <h2 className="pl-1 card-title capitalize font-semibold text-2xl">
                      {dish.title}
                    </h2>
                    <p className=" ">{dish.method.slice(0, 100)}...</p>
                    <ListIngrediet ing={dish.ingredients} />
                    <div className="flex">
                      <p className=" font-bold pl-1 flex items-center ">
                        <MdTimer />
                        Time: {dish.time} minut{" "}
                      </p>
                      <p className=" font-bold pl-1 flex items-center ">
                        <IoIosPricetag />
                        Price: {fromatPrice(dish.price)}
                      </p>
                    </div>
                  </div>

                  <figure>
                    <img
                      className=" w-full h-52  object-cover"
                      src={dish.imgURL[0]}
                      alt={dish.title}
                    />
                  </figure>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
    if (data.length == 0) {
      return (
        <div className="h-96 flex items-center justify-center gap-3  place-items-center  flex-col">
          <h1 className=" flex items-center opacity-60 justify-center gap-3 place-items-center md:text-3xl text-xl font-bold ">
            Your list of dishes is empty
            <GiSadCrab />
          </h1>
          <Link
            className="link link-success  md:text-3xl text-xl font-bold"
            to="/create"
          >
            Create now
          </Link>
        </div>
      );
    }
  }
  if (!data) {
    return <LoadingData size="size-36" />;
  }
}

export default DishesList;
