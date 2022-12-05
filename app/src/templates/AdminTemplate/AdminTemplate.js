import { Avatar, Layout, Select } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../redux/actions/UserManagementAction";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

export default function AdminTemplate(props) {
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: t("userManagement"),
      to: "/admin/users",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: t("filmManagement"),
      to: "/admin/films",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: t("showtimesManagement"),
      to: "/admin/showtimes",
    },
  ];
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (userLogin && userLogin.maLoaiNguoiDung === 'QuanTri') {
    return (
      <Route
        {...restProps}
        render={(propsRoute) => {
          return (
            <>
              <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                  <div className="logo flex items-center">
                    <NavLink
                      to="/admin/users"
                      className="flex items-center"
                      aria-label="Back to Admin page"
                    >
                      <img
                        width={40}
                        height={40}
                        alt="homepage"
                        className="inline-block"
                        src="/images/logoTixLoading.png"
                      />
                      <span className="text-white font-bold nameCompany">
                        {t("company")}
                      </span>
                    </NavLink>
                  </div>
                  <ul className="pt-2 pb-4 space-y-1 text-sm text-white">
                    {items.map((nav, idx) => {
                      return (
                        <li
                          className="dark:bg-gray-800 dark:text-gray-50 m-0"
                          key={nav.key}
                        >
                          <NavLink
                            className="flex items-center py-3 px-4 space-x-3 adminLink text-white"
                            to={nav.to}
                            activeClassName="bg-red-500 text-white"
                          >
                            {nav.icon}
                            <span className="adminNav">{nav.label}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </Sider>
                <Layout className="site-layout">
                  <Header
                    className="site-layout-background"
                    style={{
                      padding: "0 15px",
                    }}
                  >
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}
                    <div className="inline-block float-right">
                      <Select
                        defaultValue="vi"
                        style={{
                          width: 100,
                        }}
                        onChange={handleChange}
                        className="flag"
                      >
                        <Option value="vi">
                          <Avatar
                            className="mr-2"
                            size={20}
                            src="/images/vi.png"
                          />{" "}
                          VI
                        </Option>
                        <Option value="en">
                          <Avatar
                            className="mr-2"
                            size={20}
                            src="/images/en.png"
                          />{" "}
                          EN
                        </Option>
                      </Select>
                      {!userLogin.taiKhoan && (
                        <>
                          <NavLink
                            to="/login"
                            className="hover:font-bold self-center px-8 py-3 hover:text-red-500"
                          >
                            <UserOutlined
                              style={{ fontSize: 30, paddingRight: 10 }}
                            />{" "}
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
                            className="focus-within:outline-none hover:font-bold self-center px-8 dark:bg-red-400 dark:text-gray-900 border-l-2 hover:text-red-500"
                          >
                            {t("logout")}
                          </button>
                        </>
                      )}
                    </div>
                  </Header>
                  <Content
                    className="site-layout-background"
                    style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: "calc(100vh - 112px)",
                    }}
                  >
                    <Component {...propsRoute} />
                  </Content>
                </Layout>
              </Layout>
            </>
          );
        }}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
}
