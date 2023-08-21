import React from 'react';
import PropTypes from 'prop-types';
import useAuth from './hooks/useAuth';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import InputText from '../components/inputs/InputText';

function RegisterPage({ onOpenLogin }) {
  const {
    handleSubmit, errors, onSubmitRegister, register,
  } = useAuth();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <InputText
          name="name"
          title="Name"
          placeholder="Enter your name"
          inputType="text"
          error={errors.name?.message}
          register={register}
        />
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
        <InputText
          name="confirm_password"
          title="Confirm Password"
          placeholder="Enter your password"
          inputType="password"
          error={errors.confirm_password?.message}
          register={register}
        />
        <ButtonPrimary fullwidth>Register</ButtonPrimary>
      </form>
      <p className="text-center my-2">
        Already have an account?
        <button
          type="button"
          onClick={onOpenLogin}
          className="text-primary visited:text-primary active:text-primary inline-block mx-1"
        >
          Login
        </button>
        here
      </p>
    </>
  );
}

RegisterPage.propTypes = {
  onOpenLogin: PropTypes.func.isRequired,
};

export default RegisterPage;
