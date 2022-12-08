import { Button, Image, Input, Popconfirm, Rate, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilm,
  getFilmById,
  getFilmList,
} from "../../../redux/actions/FilmManagementAction";
import {
  EditOutlined,
  DeleteOutlined,
  VideoCameraAddOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import {
  setContentDrawer,
  showDrawer,
} from "../../../redux/actions/DrawerHOCAction";
import AddFilmForm from "../../../components/forms/AddFilmForm/AddFilmForm";
import EditFilmForm from "../../../components/forms/EditFilmForm/EditFilmForm";
import AddShowTimesFilmForm from "../../../components/forms/AddShowTimesFilmForm/AddShowTimesFilmForm";
import { getInformationOfTheaters } from "../../../redux/actions/TheaterManagementAction";

const { Search } = Input;

export default function FilmManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { filmList } = useSelector((state) => state.FilmManagementReducer);
  const { resetAction } = useSelector((state) => state.DrawerHOCReducer);

  const handleShowTimesFilm = async (film) => {
    dispatch(showDrawer());
    await dispatch(getFilmById(film.maPhim));
    await dispatch(getInformationOfTheaters());
    await dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-red-500">{t("addShowtimesFilm")}</span>,
        <AddShowTimesFilmForm />
      )
    );
  }

  const handleEditFilm = (film) => {
    dispatch(showDrawer());
    dispatch(getFilmById(film.maPhim));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-red-500">{t("editFilm")}</span>,
        <EditFilmForm />
      )
    );
  };

  const handleAddFilm = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-red-500">{t("addFilm")}</span>,
        <AddFilmForm />
      )
    );
  };

  const confirmDelete = (film) => {
    dispatch(deleteFilm(film.maPhim));
  };

  const columns = [
    {
      title: t("filmCode"),
      dataIndex: "maPhim",
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.maPhim > b.maPhim) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "descend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("filmImg"),
      dataIndex: "hinhAnh",
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Image width={150} src={text} />
          </div>
        );
      },
    },
    {
      title: t("name"),
      dataIndex: "tenPhim",
      width: 200,
      sorter: {
        compare: (a, b) => {
          let phimA = a.tenPhim.toLowerCase().trim();
          let phimB = b.tenPhim.toLowerCase().trim();
          if (phimA > phimB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
    },
    {
      title: t("filmDate"),
      dataIndex: "ngayKhoiChieu",
      width: 150,
      render: (text, record, index) => {
        return (
          <p className="text-center">
            {moment(text).format("hh:mm DD-MM-YYYY")}
          </p>
        );
      },
      sorter: {
        compare: (a, b) => {
          let dateA = a.ngayKhoiChieu.toLowerCase().trim();
          let dateB = b.ngayKhoiChieu.toLowerCase().trim();
          if (dateA > dateB) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: t("filmReview"),
      dataIndex: "danhGia",
      width: 165,
      render: (text, record, index) => {
        return <Rate style={{ fontSize: 20 }} allowHalf value={text / 2} />;
      },
      sorter: {
        compare: (a, b) => {
          if (a.danhGia > b.danhGia) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: t("filmDesc"),
      dataIndex: "moTa",
      width: 280,
      render: (text, record, index) => {
        return <p>{text.length > 100 ? text.slice(0, 100) + "..." : text}</p>;
      },
    },
    {
      title: t("filmAction"),
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button
                onClick={() => handleEditFilm(record)}
                className="mx-2 text-blue-600 text-2xl focus-within:outline-none"
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("messageDeleteFilm")}
                onConfirm={() => confirmDelete(record)}
                okText={t("confirm")}
                cancelText={t("cancel")}
              >
                <button className="mx-2 text-red-500 text-2xl focus-within:outline-none">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
              <button
                onClick={() => handleShowTimesFilm(record)}
                className="mx-2 text-green-700 text-2xl focus-within:outline-none"
              >
                <CalendarOutlined />
              </button>
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
      dispatch(getFilmList(e.target.value));
    }, 300);
  };

  useEffect(() => {
    dispatch(getFilmList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("filmManagement")}
      </h3>
      <Button
        type="danger"
        onClick={handleAddFilm}
        className="flex items-center mb-6 focus-within:outline-none"
      >
        <VideoCameraAddOutlined /> {t("addFilm")}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        className="mb-6 search-btn"
        size="large"
      />
      <Table columns={columns} dataSource={filmList} rowKey="maPhim" />
    </div>
  );
}
