import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Toast from "./components/utils/Toast";
import { asyncPreloadProcess } from "./states/isPreload/action";

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <AuthPage />
        <Toast />
      </>
    );
  }

  return (
    <>
      <HomePage />
      <Toast />
    </>
  );
}

export default App;
