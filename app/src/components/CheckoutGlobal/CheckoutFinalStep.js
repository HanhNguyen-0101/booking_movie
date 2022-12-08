import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { alphabe, formatTime } from "../../utils/formatDate";

export default function CheckoutFinalStep({ thongTinTaiKhoan }) {
  const { t } = useTranslation();
  const renderCard = () => {
    return thongTinTaiKhoan.thongTinDatVe?.map((ticket, index) => {
      return (
        <div className="p-4 lg:w-1/2" key={index}>
          <div className="h-full flex sm:flex-row flex-col items-center text-left">
            <img
              alt="team"
              className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-medium text-lg text-gray-900">
                {ticket.tenPhim}
              </h2>
              <h3 className="text-gray-500 mb-4 mt-1">
                {ticket.danhSachGhe[0]?.tenHeThongRap}
              </h3>
              <p className="my-2">
                {t("showDate")} {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p className="my-2">
                {t("times")}{" "}
                <Tag className="my-1">
                  <span style={{ color: "green" }}>
                    {formatTime(ticket.ngayDat)} ~{" "}
                    <span style={{ color: "gray" }}>
                      {formatTime(
                        ticket.ngayDat,
                        ticket.thoiLuongPhim
                          ? ticket.thoiLuongPhim / 60
                          : ticket.thoiLuongPhim
                      )}
                    </span>
                  </span>
                </Tag>
              </p>
              <p className="my-2">
                {t("theaterName")} {ticket.danhSachGhe[0]?.tenCumRap} -{" "}
                {ticket.danhSachGhe?.map((seat, index) => {
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
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full flex h-auto pt-4 px-32">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-red-500 tracking-widest">
              {t("final1")}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {t("final2")}{" "}
              <span className="text-red-500">{thongTinTaiKhoan.hoTen}</span>{" "}
              {t("final3")}
              <br />
              {t("final4")}
            </p>
          </div>
          <div className="flex flex-wrap -m-4">{renderCard()}</div>
        </div>
      </section>
    </div>
  );
}
