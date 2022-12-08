import { Avatar, Image, Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UpdateAccountForm from "../../../components/forms/UpdateAccountForm/UpdateAccountForm";
import { thongTinTaiKhoan } from "../../../redux/actions/UserManagementAction";
import { alphabe } from "../../../utils/formatDate";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userLogin = useSelector(
    (state) => state.UserManagementReducer.thongTinTaiKhoan
  );

  const columns = [
    {
      title: t("ticketCode"),
      dataIndex: "maVe",
      width: 80,
      sorter: {
        compare: (a, b) => {
          if (a.maVe > b.maVe) {
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
      width: 100,
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Image width={100} src={text} />
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
        title: t("longTime"),
        dataIndex: "thoiLuongPhim",
        render: (text, record, index) => {
          return (
            <p>{text}</p>
          );
        },
      },
    {
      title: t("bookDate"),
      dataIndex: "ngayDat",
      width: 100,
      render: (text, record, index) => {
        return <Tag>{moment(text).format("hh:mm, DD-MM-YYYY")}</Tag>;
      },
      sorter: {
        compare: (a, b) => {
          let dateA = a.ngayDat.toLowerCase().trim();
          let dateB = b.ngayDat.toLowerCase().trim();
          if (dateA > dateB) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: t("addressTheater"),
      dataIndex: "danhSachGhe",
      width: 150,
      render: (text, record, index) => {
        return (
          <p>{`${record.danhSachGhe[0]?.tenHeThongRap} - ${record.danhSachGhe[0]?.tenCumRap}`}</p>
        );
      },
    },
    {
      title: t("seats"),
      dataIndex: "danhSachGhe",
      width: 165,
      render: (text, record, index) => {
        return (
          <div>
            {record.danhSachGhe?.map((seat, index) => {
              return (
                <Tag
                  color="#87d068"
                  key={index}
                  className="font-bold text-black mb-1 mr-1"
                >
                  {alphabe[Math.floor((Number(seat.tenGhe) - 1) / 16)]}
                  {Number(seat.tenGhe) % 16 === 0
                    ? 16
                    : Number(seat.tenGhe) % 16}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: t("priceTicket"),
      dataIndex: "giaVe",
      width: 150,
      render: (text, record, index) => {
        return <p className="font-bold">{text?.toLocaleString()}</p>;
      },
    },
    {
      title: t("total"),
      dataIndex: "danhSachGhe",
      width: 165,
      render: (text, record, index) => {
        return (
          <div className="text-center font-bold">
            {(record.danhSachGhe.length * record.giaVe).toLocaleString()}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(thongTinTaiKhoan());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-12 container max-w-6xl">
      <div className="grid grid-cols-3">
        <div className="col-span-1 p-2 flex flex-col items-center justify-center">
          <Avatar
            size={200}
            src="https://source.unsplash.com/100x100/?portrait"
          />
          <div className="my-6 text-center text-xl font-bold text-red-500">
            {userLogin.hoTen}
          </div>
        </div>
        <div className="col-span-2 p-2">
          <h3 className="uppercase text-red-500 text-2xl font-bold mb-4">
            {t("accountInfo")}
          </h3>
          <UpdateAccountForm />
        </div>
      </div>
      <hr />
      <div className="mt-6">
        <h3 className="text-center uppercase text-red-500 text-2xl font-bold mb-4">
          {t("history")}
        </h3>
        <Table
          columns={columns}
          dataSource={userLogin.thongTinDatVe}
          rowKey="maVe"
        />
      </div>
    </div>
  );
}
