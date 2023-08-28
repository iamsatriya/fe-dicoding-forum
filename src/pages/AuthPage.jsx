import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Logo from '../assets/img/logo_in_black.png';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  const onOpenLogin = () => {
    setIsRegister(false);
  };

  const onOpenRegister = () => {
    setIsRegister(true);
  };

  return (
    <section className="flex flex-col lg:min-h-screen lg:flex-row">
      <section className="grid place-items-center m-4 lg:flex-1">
        <img src={Logo} alt="Dicoding Forum Logo" />
      </section>
      <section className="grid place-items-center p-4 lg:flex-1">
        <section className="w-full">
          <section className="text-center mb-6">
            <span className="relative">
              <span className="text-center font-poppins font-semibold text-xl lg:text-3xl before:block before:bg-primary before:absolute before:w-full before:h-1 before:-translate-x-1/2 before:left-1/2 before:-bottom-3 before:rounded-lg">
                {isRegister ? 'Create an account' : 'Login'}
              </span>
            </span>
          </section>
          {isRegister
            ? <RegisterPage onOpenLogin={onOpenLogin} />
            : <LoginPage onOpenRegister={onOpenRegister} />}
        </section>
      </section>
    </section>
  );
}

export default AuthPage;
