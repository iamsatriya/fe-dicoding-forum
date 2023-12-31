import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import Toast from "./components/utils/Toast";
import Navigation from "./components/headers/Navigation";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import { asyncPreloadProcess } from "./states/isPreload/action";

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

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
      <Navigation onLogout={onLogout} />
      <main className="relative mb-4 top-20">
        <LoadingBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
        </Routes>
      </main>
      <Toast />
    </>
  );
}

export default App;
