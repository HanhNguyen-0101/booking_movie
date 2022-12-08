import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../../redux/actions/UserManagementAction";

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().max(30, t("30Char")).required(t("enterAccount")),
      matKhau: Yup.string().required(t("enterPassword")),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-6 bg-red-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <NavLink
            to="/home"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              width={60}
              height={60}
              alt="homepage"
              src="/images/logoTixLoading.png"
            />
          </NavLink>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-red-500 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold"
        >
          {t("login")}
        </h2>
        <div className="mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("account")}
              </div>
              <input
                className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="input"
                name="taiKhoan"
                value={formik.values.taiKhoan}
                placeholder={t("inputAccount")}
                onChange={formik.handleChange}
              />
              {formik.errors.taiKhoan ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.taiKhoan}
                </div>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("password")}
                </div>
              </div>
              <input
                className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="password"
                name="matKhau"
                value={formik.values.matKhau}
                placeholder={t("inputPassword")}
                onChange={formik.handleChange}
              />
              {formik.errors.matKhau ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.matKhau}
                </div>
              ) : null}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
            shadow-lg"
              >
                {t("login")}
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            {t("noAccount")}
            <NavLink
              className="cursor-pointer pl-1 text-red-600 hover:text-red-800"
              to="/register"
            >
              {t("register")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
