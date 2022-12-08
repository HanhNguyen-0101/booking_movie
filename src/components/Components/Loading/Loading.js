import React from "react";
import { useSelector } from "react-redux";
import LoadingStyle from "./Loading.module.css";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const loadingClass = isLoading ? "show-loading" : "hide-loading";
  return (
    <div className={`${LoadingStyle.loading} ${LoadingStyle[loadingClass]}`}>
      <img alt="loading" src="./images/logoTixLoading.png" />
    </div>
  );
}
