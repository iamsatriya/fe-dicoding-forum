import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const InputText = forwardRef(
  (
    {
      title,
      placeholder,
      inputType = "text",
      error,
      register,
      name,
      isRequired,
    },
    ref,
  ) => (
    <>
      <section
        className={`rounded-lg border-2 border-gray-300 px-4 py-1 focus-within:border-primary ${
          !error && "mb-4"
        }`}
      >
        <p className="font-semibold font-poppins">{title}</p>
        <input
          ref={ref}
          placeholder={placeholder}
          className="w-full outline-none placeholder:text-gray-300"
          type={inputType}
          {...register(name, {
            required: isRequired ? `${title} is required` : false,
            pattern: inputType === "email" && {
              // eslint-disable-next-line no-useless-escape
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Must be valid email",
            },
          })}
        />
      </section>
      {error && (
        <p className="mb-4 text-primary font-light text-sm mt-1">{error}</p>
      )}
    </>
  ),
);

InputText.defaultProps = {
  error: "",
  placeholder: "",
  inputType: "text",
  isRequired: true,
};

InputText.propTypes = {
  title: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default InputText;
