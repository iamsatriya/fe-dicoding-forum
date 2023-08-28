import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import InputText from "../components/inputs/InputText";
import { asyncSetAuthUser } from "../states/authUser/action";

function LoginPage({ onOpenRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmitLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

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
        <ButtonPrimary fullwidth type="submit">
          Login
        </ButtonPrimary>
      </form>
      <p className="text-center my-2">
        or
        <button
          type="button"
          onClick={onOpenRegister}
          className="text-primary visited:text-primary active:text-primary inline-block ml-1"
        >
          Create an account
        </button>
      </p>
    </>
  );
}

LoginPage.propTypes = {
  onOpenRegister: PropTypes.func.isRequired,
};

export default LoginPage;
