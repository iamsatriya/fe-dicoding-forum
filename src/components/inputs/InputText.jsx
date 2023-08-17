import PropTypes from 'prop-types';

const InputText = ({ title, placeholder, inputType = 'text' }) => {
  return (
    <section className="rounded-lg border-2 border-gray-300 px-4 py-1 mb-4 focus-within:border-primary">
      <p className='font-semibold font-poppins text-lg'>{title}</p>
      <input placeholder={placeholder} className="w-full outline-none placeholder:text-gray-300" type={inputType} />
    </section>
  );
};

InputText.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputType: PropTypes.string
};

export default InputText;
