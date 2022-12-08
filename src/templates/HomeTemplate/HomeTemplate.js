import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/HomeGlobal/Footer/Footer";
import Header from "../../components/HomeGlobal/Header/Header";

export default function HomeTemplate(props) {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <Header {...propsRoute} />
            <div className="h-16"></div>
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </>
        );
      }}
    />
  );
}
