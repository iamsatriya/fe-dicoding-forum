import PropTypes from 'prop-types';
import useAuth from './hooks/useAuth';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import InputText from '../components/inputs/InputText';

const LoginPage = ({ onOpenRegister }) => {
  const { handleSubmit, errors, onSubmitLogin, register } = useAuth();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <InputText
          name="email"
          title="Email"
          placeholder="Enter your email"
          inputType="email"
          error={errors.email?.message}
          register={register}
        />
        <InputText
          name="password"
          title="Password"
          placeholder="Enter your password"
          inputType="password"
          error={errors.password?.message}
          register={register}
        />
        <ButtonPrimary fullwidth>Login</ButtonPrimary>
      </form>
      <p className="text-center my-2">
        or
        <button
          onClick={onOpenRegister}
          className="text-primary visited:text-primary active:text-primary inline-block ml-1"
        >
          Create an account
        </button>
      </p>
    </>
  );
};

LoginPage.propTypes = {
  onOpenRegister: PropTypes.func.isRequired
};

export default LoginPage;
