import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachNguoiDung, layDanhSachNguoiDungTheoTaiKhoan, xoaThanhVien } from "../../../redux/actions/UserManagementAction";
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  setContentDrawer,
  showDrawer,
} from "../../../redux/actions/DrawerHOCAction";
import AddUserForm from "../../../components/forms/AddUserForm/AddUserForm";
import EditUserForm from "../../../components/forms/EditUserForm/EditUserForm";
const { Search } = Input;

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { dsNguoiDung } = useSelector((state) => state.UserManagementReducer);
  const { resetAction } = useSelector((state) => state.DrawerHOCReducer);

  const confirmDelete = (user) => {
    dispatch(xoaThanhVien(user.taiKhoan));
  };

  const handleAddUser = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-red-500">{t("addUser")}</span>,
        <AddUserForm />
      )
    );
  };

  const handleEditUser = (user) => {
    dispatch(showDrawer());
    dispatch(layDanhSachNguoiDungTheoTaiKhoan(user.taiKhoan));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-red-500">{t("editUser")}</span>,
        <EditUserForm />
      )
    );
  };

  const columns = [
    {
      title: t("account"),
      dataIndex: "taiKhoan",
      width: 140,
      sorter: {
        compare: (a, b) => {
          let accountA = a.taiKhoan.toLowerCase().trim();
          let accountB = b.taiKhoan.toLowerCase().trim();
          if (accountA > accountB) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("username"),
      dataIndex: "hoTen",
      sorter: {
        compare: (a, b) => {
          let nameA = a.hoTen.toLowerCase().trim();
          let nameB = b.hoTen.toLowerCase().trim();
          if (nameA > nameB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
    },
    {
      title: t("typeUser"),
      dataIndex: "maLoaiNguoiDung",
      width: 170,
      render: (text) => {
        let color = text === "QuanTri" ? "red" : "green";
        let label = text === "QuanTri" ? t("admin") : t("user");
        return (
          <div className="text-center">
            <Tag color={color}>
              <span className="uppercase">{label}</span>
            </Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          let typeA = a.maLoaiNguoiDung.toLowerCase().trim();
          let typeB = b.maLoaiNguoiDung.toLowerCase().trim();
          if (typeA > typeB) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: t("phone"),
      dataIndex: "soDt",
    },
    {
      title: t("email"),
      dataIndex: "email",
      sorter: {
        compare: (a, b) => {
          let emailA = a.email.toLowerCase().trim();
          let emailB = b.email.toLowerCase().trim();
          if (emailA > emailB) {
            return 1;
          }
          return -1;
        },
        multiple: 4,
      },
    },
    {
      title: t("filmAction"),
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button className="mx-2 text-blue-600 text-2xl focus-within:outline-none" onClick={() => handleEditUser(record)}>
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("messageDeleteUser")}
                onConfirm={() => confirmDelete(record)}
                okText={t("confirm")}
                cancelText={t("cancel")}
              >
                <button className="mx-2 text-red-500 text-2xl focus-within:outline-none">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  const onSearch = (e) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      let searchText = e.target.value ? e.target.value.trim() : e.target.value;
      dispatch(layDanhSachNguoiDung(searchText));
    }, 300);
  }

  useEffect(() => {
    dispatch(layDanhSachNguoiDung());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("userManagement")}
      </h3>
      <Button
        onClick={handleAddUser}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none"
      >
        <UsergroupAddOutlined /> {t("addUser")}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={dsNguoiDung} rowKey="taiKhoan" />
    </div>
  );
}
