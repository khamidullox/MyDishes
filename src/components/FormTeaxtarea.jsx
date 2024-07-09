import React from "react";

function FormTeaxtarea({ label, name, placeholder, refTextarea , size }) {
  return (
    <label className=" form-control w-full max-w-xl">
      <div className="">
        <span className="label-text font-medium pl-2">{label}</span>
      </div>
      <textarea
        placeholder={placeholder}
        name={name}
        className={`textarea mt-2 textarea-bordered textarea-sm  max-w-xl w-full ${size}`}
        ref={refTextarea}
      ></textarea>
    </label>
  );
}

export default FormTeaxtarea;
