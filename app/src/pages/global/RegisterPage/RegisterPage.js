import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { dangKiNguoiDung } from "../../../redux/actions/UserManagementAction";
import { GROUP } from "../../../utils/configSetting";

export default function RegisterPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP,
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().max(30, t("30Char")).required(t("enterAccount")),
      matKhau: Yup.string().required(t("enterPassword")),
      hoTen: Yup.string().max(30, t("30Char")).required(t("enterUsername")),
      email: Yup.string().email(t("enterEmail1")),
      soDt: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        t("enterPhone1")
      ),
    }),
    onSubmit: (values) => {
      dispatch(dangKiNguoiDung(values));
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
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-red-500 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold"
        >
          {t("register")}
        </h2>
        <div className="mt-10">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("account")}
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="input"
                name="taiKhoan"
                value={formik.values.taiKhoan}
                placeholder={t("enterAccount1")}
                onChange={formik.handleChange}
              />
              {formik.errors.taiKhoan ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.taiKhoan}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("password")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="password"
                name="matKhau"
                value={formik.values.matKhau}
                placeholder={t("enterPassword1")}
                onChange={formik.handleChange}
              />
              {formik.errors.matKhau ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.matKhau}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("username")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="text"
                name="hoTen"
                value={formik.values.hoTen}
                placeholder={t("enterUsername1")}
                onChange={formik.handleChange}
              />
              {formik.errors.hoTen ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.hoTen}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("email")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="email"
                name="email"
                value={formik.values.email}
                placeholder={t("enterEmail")}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("phone")}
                </div>
              </div>
              <input
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-red-500"
                type="text"
                name="soDt"
                value={formik.values.soDt}
                placeholder={t("enterPhone")}
                onChange={formik.handleChange}
              />
              {formik.errors.soDt ? (
                <div className="text-red-500 text-sm">{formik.errors.soDt}</div>
              ) : null}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-red-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
            shadow-lg"
              >
                {t("register")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
