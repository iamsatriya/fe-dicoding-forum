import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import InputText from "../components/inputs/InputText";
import { asyncRegisterUser } from "../states/users/action";

function RegisterPage({ onOpenLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const isPasswordMatch = (password, confirmPassword) =>
    password === confirmPassword;

  const onSubmitRegister = (data) => {
    if (!isPasswordMatch(data.password, data.confirm_password)) {
      setError("confirm_password", {
        type: "custom",
        message: "Password didn't match!",
      });
    } else {
      const { name, email, password } = data;
      dispatch(asyncRegisterUser({ name, email, password }));
    }
  };

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
        <ButtonPrimary fullwidth type="submit">
          Register
        </ButtonPrimary>
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
