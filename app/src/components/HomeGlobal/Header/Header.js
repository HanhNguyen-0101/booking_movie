import React from "react";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Select } from "antd";
import { useTranslation } from "react-i18next";
import { logout } from "../../../redux/actions/UserManagementAction";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

export default function Header() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  return (
    <header className="px-4 bg-coolGray-100 text-coolGray-800 opacity-90 bg-white text-black fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
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
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-1 dark:text-red-400 hover:text-red-500"
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center px-4 -mb-1 hover:text-red-500"
            >
              {t("contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-1 hover:text-red-500"
            >
              {t("news")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Select
            defaultValue="vi"
            style={{
              width: 100,
            }}
            onChange={handleChange}
            className="flag"
          >
            <Option value="vi">
              <Avatar className="mr-2" size={20} src="/images/vi.png" /> VI
            </Option>
            <Option value="en">
              <Avatar className="mr-2" size={20} src="/images/en.png" /> EN
            </Option>
          </Select>
          {!userLogin.taiKhoan && (
            <>
              <NavLink
                to="/login"
                className="hover:font-bold self-center px-8 py-3 hover:text-red-500"
              >
                <UserOutlined style={{ fontSize: 30, paddingRight: 10 }} />{" "}
                <span>{t("login")}</span>
              </NavLink>
              <NavLink
                to="/register"
                className="hover:font-bold self-center px-8 py-3 dark:bg-red-400 dark:text-gray-900 border-l-2 hover:text-red-500"
              >
                {t("register")}
              </NavLink>
            </>
          )}
          {userLogin.taiKhoan && (
            <>
              <NavLink
                to="/profile"
                className="hover:font-bold self-center px-8 py-3 hover:text-red-500"
              >
                <Avatar src="https://source.unsplash.com/100x100/?portrait" />
                <span className="pl-3">{userLogin.hoTen}</span>
              </NavLink>
              <button
                onClick={() => dispatch(logout())}
                className="focus-within:outline-none hover:font-bold self-center px-8 py-3 dark:bg-red-400 dark:text-gray-900 border-l-2 hover:text-red-500"
              >
                {t("logout")}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
