import PropTypes from 'prop-types';

const ButtonPrimary = ({ children, fullwidth, small }) => {
  return (
    <button
      className={`${fullwidth ? 'w-full' : 'w-auto'} ${
        small ? 'p-2 max-h-14' : 'p-4'
      } font-poppins font-semibold text-white bg-primary rounded-lg flex-1`}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  fullwidth: PropTypes.bool,
  small: PropTypes.bool
};

export default ButtonPrimary;
