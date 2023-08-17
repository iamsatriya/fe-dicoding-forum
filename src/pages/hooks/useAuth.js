import { useForm } from 'react-hook-form';

const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const isPasswordMatch = (password, confirmPassword) => password === confirmPassword;

  const onSubmitRegister = (data) => {
    console.log('submit register', data);
    console.log(isPasswordMatch);
    if (!isPasswordMatch(data.password, data.confirm_password))
      setError('confirm_password', { type: 'custom', message: "Password didn't match!" });
  };

  const onSubmitLogin = (data) => {
    console.log('submit login', data);
  };

  return { register, handleSubmit, errors, onSubmitRegister, onSubmitLogin };
};

export default useAuth;
