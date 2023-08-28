import { useForm } from "react-hook-form";

const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmitLogin = () => {};

  return {
    register,
    handleSubmit,
    errors,
    onSubmitLogin,
  };
};

export default useAuth;
