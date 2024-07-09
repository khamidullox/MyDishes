import React, { Children } from "react";

function FormInput({
  lebal,
  type,
  name,
  plecholder,
  size,
  classInput,
  refInput,
}) {
  return (
    <>
      <label className={` form-control w-full  ${size ? size : "max-w-xs"}`}>
        <div className="label">
          <span className="label-text font-medium">{lebal}</span>
        </div>
        <input
          ref={refInput}
          type={type}
          name={name}
          placeholder={plecholder}
          className={`input input-bordered w-full  ${
            size ? size : "max-w-xs"
          } ${classInput} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </label>
    </>
  );
}

export default FormInput;
