import React, { useEffect, Component, Suspense } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./scss/style.scss";
import { tokenLogin } from "./store/Auth";
import { useDispatch, useSelector } from "react-redux";
import { login, devices } from "./routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
import DefaultLayout from "./layout/DefaultLayout";

// Pages
import Login from "./views/pages/login/Login";
import Register from "./views/pages/register/Register";
import Page404 from "./views/pages/register/Register";
import Page500 from "./views/pages/register/Register";

const App = () => {
  const routePath = useLocation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [routePath]);

  useEffect(() => {
    dispatch(tokenLogin());
  }, [dispatch]);

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/" name="Login Page" element={<Login />} />
        <Route
          path={login}
          element={isAuth ? <Navigate replace to={`/${devices}`} /> : <Login />}
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          element={<Register />}
        />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route
          path="*"
          name="Home"
          element={isAuth ? <DefaultLayout /> : <Login />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
