import toast from 'react-hot-toast';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import InputText from '../components/inputs/InputText';
import Logo from '../assets/img/logo_in_black.png';

const LoginPage = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    toast.success('Success Login');
  };
  return (
    <section className="flex flex-col lg:min-h-screen lg:flex-row">
      <section className="grid place-items-center m-4 lg:flex-1">
        <img src={Logo} />
      </section>
      <section className="grid place-items-center p-4 lg:flex-1">
        <section className="w-full">
          <section className="text-center mb-4">
            <span className="relative">
              <span className="text-center font-poppins font-semibold text-xl lg:text-3xl before:block before:bg-primary before:absolute before:w-full before:h-1 before:-translate-x-1/2 before:left-1/2 before:-bottom-3 before:rounded-lg">
                Login
              </span>
            </span>
          </section>
          <form onSubmit={onSubmit}>
            <InputText title="Name" placeholder="Enter your name" />
            <InputText title="Email" placeholder="Enter your email" inputType="email" />
            <InputText title="Password" placeholder="Enter your password" inputType="password" />
            <InputText title="Confirm Password" placeholder="Enter your password" inputType="password" />
            <ButtonPrimary fullwidth>Login</ButtonPrimary>
          </form>
          <p className="text-center my-2">
            or{' '}
            <a href="#" className="text-primary visited:text-primary active:text-primary">
              Create an account
            </a>
          </p>
        </section>
      </section>
    </section>
  );
};

export default LoginPage;
