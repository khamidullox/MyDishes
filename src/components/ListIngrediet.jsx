import React from "react";

function ListIngrediet({ ing, size }) {
  return (
    ing.length >= 1 && (
      <ul className="flex items-center max-w-xl pl-1 w-full justify-start gap-2 flex-wrap">
        <li className={` text-lg  ${size}`}>Ingredients:</li>
        {ing.map((item, id) => {
          return (
            <li key={id} className=" badge badge-outline capitalize p- ">
              {item}
            </li>
          );
        })}
      </ul>
    )
  );
}

export default ListIngrediet;
