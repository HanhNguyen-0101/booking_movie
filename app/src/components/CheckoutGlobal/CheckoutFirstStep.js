import { Avatar, Button, Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { alphabe } from "../../utils/formatDate";
import { bookingSeat } from "../../redux/actions/BookingManagementAction";
import "./checkout.css";
import _ from "lodash";
import { useTranslation } from "react-i18next";

export default function CheckoutFirstStep(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { next, bookingData, userData, seatData, time, customerBooking } =
    props;
  const { maLichChieu } = props.match.params;

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
              Phone
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
      </div>
    );
  };
  const renderHeaderBooking = () => {
    return (
      <div className="py-2 inline-block w-full">
        <div className="inline-block float-left">
          <div className="flex flex-row items-center justify-center">
            <Avatar size={50} src={bookingData.thongTinPhim?.hinhAnh} />
            <div className="pl-2">
              <p className="font-bold text-green-700">
                {bookingData.thongTinPhim?.diaChi}
              </p>
              <p className="text-gray-400 text-xs">
                {bookingData.thongTinPhim?.ngayChieu} -{" "}
                {bookingData.thongTinPhim?.gioChieu} -{" "}
                {bookingData.thongTinPhim?.tenRap}
              </p>
            </div>
          </div>
        </div>
        <div className="inline-block text-center float-right">
          <p className="text-xs text-gray-400">{t("holdingTime")}</p>
          <p className="font-bold text-red-500 text-2xl">{time}</p>
        </div>
      </div>
    );
  };
  const renderTheaterMap = () => {
    return _.sortBy(bookingData.danhSachGhe, "maGhe")?.map((ghe, index) => {
      let chairClass = `${index} px-1 ghe `;
      const idxChon = customerBooking?.findIndex((i) => i.maGhe === ghe.maGhe);
      if (ghe.daDat) {
        chairClass += "gheDaDuocMua ";
      } else {
        if (idxChon !== -1) {
          chairClass += "gheKhachDangChon ";
        } else {
          const idx = seatData?.findIndex((i) => i.maGhe === ghe.maGhe);
          if (idx !== -1) {
            chairClass += "gheDangChon ";
          } else {
            if (ghe.loaiGhe === "Vip") {
              chairClass += "gheVip ";
            }
          }
        }
      }
      return (
        <span key={index} className="relative">
          {index % 16 === 0 && (
            <span className="gheTitle">{alphabe[index / 16]}</span>
          )}
          <button
            className={chairClass}
            disabled={ghe.daDat || idxChon !== -1}
            onClick={() => {
              dispatch(bookingSeat(ghe, maLichChieu));
            }}
          ></button>
          {(index + 1) % 16 === 0 && <br />}
          {index === 0 && (
            <div
              className="absolute bg-no-repeat bg-contain"
              style={{
                top: 0,
                left: 0,
                transform: "translate(55%, 50%)",
                zIndex: 0,
                backgroundImage: 'url("/images/seatcenter.png")',
                width: 350,
                height: 200,
              }}
            ></div>
          )}
        </span>
      );
    });
  };
  return (
    <div className="w-full flex h-auto pt-16">
      <div className="py-6 px-32 w-3/4 dark:bg-gray-900 dark:text-gray-100 inline-block float-left">
        {renderHeaderBooking()}
        <div className="py-1">
          <div
            className="m-auto bg-white bg-contain bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/screen.png")',
              height: 100,
              width: 800,
            }}
          ></div>
          <div className="list text-center relative">{renderTheaterMap()}</div>
          <div className="pt-10 pb-1">
            <div className="grid grid-cols-5 items-center justify-center">
              <div className="col-span-1 text-center">
                <i
                  className="my-2 fa fa-window-maximize block"
                  style={{ color: "gray", fontSize: 30 }}
                />
                <p className="text-sm text-gray-400">{t("regularSeat")}</p>
              </div>
              <div className="col-span-1 text-center">
                <i
                  className="my-2 fa fa-window-maximize block"
                  style={{ color: "#e3be21", fontSize: 30 }}
                />
                <p className="text-sm text-gray-400">{t("vipSeat")}</p>
              </div>
              <div className="col-span-1 text-center">
                <i
                  className="my-2 fa fa-window-maximize block"
                  style={{ color: "#82d00b", fontSize: 30 }}
                />
                <p className="text-sm text-gray-400">{t("choosingSeat")}</p>
              </div>
              <div className="col-span-1 text-center">
                <i
                  className="my-2 fa fa-window-close block"
                  style={{ fontSize: 30, color: "#70a5da" }}
                />
                <p className="text-sm text-gray-400">
                  {t("choosingGuestSeat")}
                </p>
              </div>
              <div className="col-span-1 text-center">
                <i
                  className="my-2 fa fa-window-close-o block"
                  style={{ fontSize: 30, color: "rgb(245, 7, 7)" }}
                />
                <p className="text-sm text-gray-400">{t("bookingSeat")}</p>
              </div>
            </div>
          </div>
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
            className="absolute w-full bottom-0 py-2 h-auto text-lg text-bold border-0 rounded-none text-white bg-red-600 hover:bg-red-600 focus:bg-red-600"
            onClick={() => next()}
            disabled={seatData.length > 0 ? false : true}
          >
            <span className="font-bold uppercase">{t("booking")}</span>
          </Button>
        </div>
      </aside>
    </div>
  );
}
