import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../utils/configSetting";

export default function CheckoutTemplate(props) {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (localStorage.getItem(USER_LOGIN)) {
    return (
      <Route
        {...restProps}
        render={(propsRoute) => {
          return (
            <Component {...propsRoute} />
          );
        }}
      />
    );
  } else {
    return <Redirect to='/login' />
  }
}
