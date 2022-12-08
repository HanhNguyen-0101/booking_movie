import { Avatar, Button, Tag } from "antd";
import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { alphabe } from "../../utils/formatDate";
import "./checkout.css";
import { useTranslation } from "react-i18next";

export default function CheckoutSecondStep({
  prev,
  next,
  bookingData,
  userData,
  seatData,
  time,
}) {
  const { t } = useTranslation();
  const payments = [
    {
      id: "zalo",
      image: "/images/zalo.jpg",
      title: t("zalopay"),
    },
    {
      id: "card",
      image: "/images/visa.png",
      title: t("visa"),
    },
    {
      id: "atm",
      image: "/images/atm.png",
      title: t("atm"),
    },
    {
      id: "store",
      image: "/images/cuahang.png",
      title: t("store"),
    },
  ];
  const [payment, setPayment] = useState(payments[0]);
  const renderInfoBooking = () => {
    return (
      <div className="p-8">
        <h3 className="text-red-600 font-bold text-center text-2xl py-2">
          {seatData
            ?.reduce((tong, seat) => {
              return (tong += seat.giaVe);
            }, 0)
            .toLocaleString()}{" "}
          đ
        </h3>
        <hr />
        <div className="py-2">
          <p className="font-bold text-base pb-1">
            {bookingData.thongTinPhim?.tenPhim}
          </p>
          <p className="pb-1">{bookingData.thongTinPhim?.tenCumRap}</p>
          <p className="pb-1">{bookingData.thongTinPhim?.diaChi}</p>
          <p className="pb-1">
            {bookingData.thongTinPhim?.ngayChieu} -{" "}
            {bookingData.thongTinPhim?.gioChieu} -{" "}
            {bookingData.thongTinPhim?.tenRap}
          </p>
        </div>
        <hr />
        <div className="py-2">
          <div>
            <span className="text-red-500 font-bold text-base">
              {t("seat")}
            </span>
            <span className="text-green-700 float-right font-bold">
              {seatData
                ?.reduce((tong, seat) => {
                  return (tong += seat.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ
            </span>
          </div>
          <div className="pt-1">
            {seatData?.map((seat, index) => {
              return (
                <Tag
                  color="#87d068"
                  key={index}
                  className="font-bold text-black mb-1 mr-1"
                >
                  {alphabe[Math.floor((Number(seat.stt) - 1) / 16)]}
                  {Number(seat.stt) % 16 === 0 ? 16 : Number(seat.stt) % 16}
                </Tag>
              );
            })}
          </div>
        </div>
        <hr />
        <form className="infoTicket">
          <div className="py-2">
            <label
              htmlFor="username"
              className="block text-gray-400 text-xs mb-2"
            >
              E-Mail
            </label>
            <div>
              <input
                id="email"
                className="text-black pt-2 pb-1 pr-2 w-full focus-within:outline-none"
                value={userData.email}
                disabled
              />
            </div>
          </div>
          <hr />
          <div className="py-2">
            <label htmlFor="phone" className="block text-gray-400 text-xs mb-2">
              {t("phone")}
            </label>
            <div>
              <input
                id="phone"
                className="text-black pt-2 pb-1 pr-2 w-full focus-within:outline-none"
                value={userData.soDT}
                disabled
              />
            </div>
          </div>
        </form>
        <hr />
        <div className="py-2">
          <p className="text-sm pb-1 text-gray-400">{t("paymentMethod")}</p>
          <p className="py-1 payment">
            <Avatar shape="square" size={40} src={payment.image} />
            <span className="pl-2 font-bold">{payment.title}</span>
          </p>
        </div>
        <hr />
        <div className="py-2">
          <p className="text-sm pb-1 text-gray-400">{t("couponCode")}</p>
          <p className="py-1">{t("unsupported")}</p>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div className="w-full flex h-auto pt-16">
      <div className="py-6 px-32 w-3/4 dark:bg-gray-900 dark:text-gray-100 inline-block float-left">
        <div className="py-2">
          <Button
            type="link"
            className="text-gray-400 text-base p-0 hover:text-red-500"
            onClick={() => prev()}
          >
            <ArrowLeftOutlined /> {t("goBack")}
          </Button>
          <div className="inline-block text-center float-right">
            <p className="text-xs text-gray-400">{t("holdingTime")}</p>
            <p className="font-bold text-red-500 text-2xl">{time}</p>
          </div>
        </div>
        <div className="py-2">
          <h3 className="py-4 font-bold uppercase">{t("paymentMethod")}</h3>
          <div>
            {payments.map((payment, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <input
                    id={payment.id}
                    type="radio"
                    name="radio"
                    className="hidden"
                    defaultChecked={index === 0 ? true : false}
                    onChange={() => {
                      setPayment(payment);
                    }}
                  />
                  <label
                    htmlFor={payment.id}
                    className="flex items-center cursor-pointer text-base"
                  >
                    <span className="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
                    <div className="inline-block payment">
                      <Avatar shape="square" size={40} src={payment.image} />
                      <span className="pl-2">{payment.title}</span>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-2">
          <h3 className="font-bold py-4 uppercase">{t("couponCode")}</h3>
          <div className="infoTicket">
            <input
              id="phone"
              className="text-black pt-2 pb-1 pr-2 focus-within:outline-none"
              value={t("unsupported")}
              disabled
            />
            <Button
              shape="round"
              className="bg-gray-500 text-white hover:bg-gray-500 hover:text-white"
            >
              {t("apply")}
            </Button>
          </div>
        </div>
        <div className="text-center py-4">
          <span>{t("noRefund")}</span>
          <p>
            {t("code")} <span className="text-red-400">ZMS</span> {t("zalo")}{" "}
            <span className="text-red-400">Email</span> {t("enter")}
          </p>
        </div>
      </div>
      <aside
        className="fixed pt-16 bg-white right-0 top-0 w-1/4 dark:bg-gray-900 dark:text-gray-100 inline-block float-right"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          minHeight: "100vh",
        }}
      >
        {renderInfoBooking()}
        <div className="steps-action">
          <Button
            className="absolute w-full bottom-0 py-2 h-auto text-lg text-bold border-0 rounded-none text-white bg-gray-500 hover:bg-red-600 focus:bg-red-600"
            onClick={() => next()}
          >
            <span className="font-bold uppercase">{t("booking")}</span>
          </Button>
        </div>
      </aside>
    </div>
  );
}
