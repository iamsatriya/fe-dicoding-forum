import PropTypes from 'prop-types';

const ButtonPrimary = ({ children, fullwidth }) => {
  return (
    <button
      className={`${
        fullwidth ? 'w-full' : 'w-auto'
      } font-poppins font-semibold text-white bg-primary px-4 py-4 rounded-lg flex-1`}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  fullwidth: PropTypes.bool
};

export default ButtonPrimary;
