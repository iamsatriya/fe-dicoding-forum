import { useForm } from 'react-hook-form';

const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const isPasswordMatch = (password, confirmPassword) => password === confirmPassword;

  const onSubmitRegister = (data) => {
    if (!isPasswordMatch(data.password, data.confirm_password)) {
      setError('confirm_password', { type: 'custom', message: "Password didn't match!" });
    }
  };

  const onSubmitLogin = () => {

  };

  return {
    register, handleSubmit, errors, onSubmitRegister, onSubmitLogin,
  };
};

export default useAuth;
