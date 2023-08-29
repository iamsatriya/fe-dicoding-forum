import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

function Navigation({ onLogout }) {
  const navigate = useNavigate();

  const onClickToHome = () => {
    navigate("/");
  };

  const onClickToLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <header className="p-4 h-20 z-10 bg-[#fff] flex justify-between items-center fixed top-0 w-full">
      <section>
        <img src={Logo} alt="Logo" className="w-11 h-11" />
      </section>
      <section>
        <button
          type="button"
          className="inline-block mx-2 font-poppins font-semibold"
          onClick={onClickToHome}
        >
          Home
        </button>
        <button
          type="button"
          className="inline-block mx-2 font-poppins font-semibold"
          onClick={onClickToLeaderboard}
        >
          Leaderboard
        </button>
        <button
          type="button"
          className="inline-block mx-2 text-primary font-poppins"
          onClick={onLogout}
        >
          Logout
        </button>
      </section>
    </header>
  );
}

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
