import React from "react";
import ShowTable from "./ShowTable";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../Redux/action";
import LoginFirst from "./LoginFirst";

const Home = () => {
  const token = useSelector((store) => store.login.token);
  const dispatch = useDispatch();

  const localStorageToken = localStorage.getItem("token");
  dispatch(userLogin(localStorageToken));

  return <>{!token ? <LoginFirst /> : <ShowTable />}</>;
};

export default Home;
