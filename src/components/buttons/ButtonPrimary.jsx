import React from "react";
import PropTypes from "prop-types";

function ButtonPrimary({ children, fullwidth, small, type }) {
  return (
    <button
      type={type}
      className={`${fullwidth ? "w-full" : "w-auto"} ${
        small ? "p-2 max-h-14" : "p-4"
      } font-poppins font-semibold text-white bg-primary rounded-lg flex-1`}
    >
      {children}
    </button>
  );
}

ButtonPrimary.defaultProps = {
  fullwidth: false,
  small: false,
  type: "button",
};

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  fullwidth: PropTypes.bool,
  small: PropTypes.bool,
  type: PropTypes.string,
};

export default ButtonPrimary;
