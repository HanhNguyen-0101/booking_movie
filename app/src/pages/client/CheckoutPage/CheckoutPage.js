import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Modal, Steps } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { USER_LOGIN } from "../../../utils/configSetting";
import CheckoutFirstStep from "../../../components/CheckoutGlobal/CheckoutFirstStep";
import {
  bookingTicket,
  getBookingList,
  updateBookingFormOtherClient,
} from "../../../redux/actions/BookingManagementAction";
import CheckoutSecondStep from "../../../components/CheckoutGlobal/CheckoutSecondStep";
import CheckoutFinalStep from "../../../components/CheckoutGlobal/CheckoutFinalStep";
import { history } from "../../../App";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { connection } from "../../..";

const { Step } = Steps;

export default function CheckoutPage(props) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(300000);
  const dispatch = useDispatch();
  const { chiTietPhongVe, bookingSeatList, customerBooking } = useSelector(
    (state) => state.BookingManagementReducer
  );
  const { thongTinTaiKhoan } = useSelector(
    (state) => state.UserManagementReducer
  );
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  const user = localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN))
    : null;
  const next = () => {
    setCurrent(current + 1);
  };
  const done = () => {
    const { maLichChieu } = props.match.params;
    let data = {
      maLichChieu,
      danhSachVe: bookingSeatList,
    };

    dispatch(bookingTicket(data));
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  let m = minutes > 9 ? minutes : "0" + minutes;
  let seconds = Math.floor((timer % (1000 * 60)) / 1000);
  let s = seconds > 9 ? seconds : "0" + seconds;
  let thoiGianGiuVe = m + ":" + s;

  const steps = [
    {
      title: t('choose'),
      content: (
        <CheckoutFirstStep
          seatData={bookingSeatList}
          bookingData={chiTietPhongVe}
          userData={userLogin}
          next={next}
          time={thoiGianGiuVe}
          customerBooking={customerBooking}
          {...props}
        />
      ),
    },
    {
      title: t('pay'),
      content: (
        <CheckoutSecondStep
          seatData={bookingSeatList}
          bookingData={chiTietPhongVe}
          userData={userLogin}
          next={done}
          prev={prev}
          time={thoiGianGiuVe}
        />
      ),
    },
    {
      title: t('resultBooking'),
      content: <CheckoutFinalStep thongTinTaiKhoan={thongTinTaiKhoan} />,
    },
  ];
  const handleOk = () => {
    return history.go(0);
  };
  useEffect(() => {
    let x = setInterval(function () {
      if (timer > 0) {
        setTimer(timer - 1000);
      }
      if (timer < 0) {
        clearInterval(x);
      }
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, [timer]);

  useEffect(() => {
    // Get init data
    const { maLichChieu } = props.match.params;
    dispatch(getBookingList(maLichChieu));

    // Realtime: When someone booking ticket successfull
    connection.on("datVeThanhCong", () => {
      dispatch(getBookingList(maLichChieu));
    });

    // Realtime: Load seatList of the other account is choosing
    connection.invoke("loadDanhSachGhe", maLichChieu);

    // Realtime: Listen when someone is choosing a seat
    connection.on("loadDanhSachGheDaDat", (dsGheDangChon) => {
      // Remove data of my acocunt
      let dsGheKhachDangChon = dsGheDangChon?.filter(
        (i) => i.taiKhoan !== userLogin.taiKhoan
      );

      // Map data from the other accounts to a array
      let dsGheKhach = dsGheKhachDangChon.reduce((result, item, index) => {
        let dsGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...dsGhe];
      }, []);

      dsGheKhach = _.uniqBy(dsGheKhach, "maGhe");

      // Dispatch to reducer
      dispatch(updateBookingFormOtherClient(dsGheKhach));
    });

    // Realtime: Destroy seat when reload page
    window.addEventListener(
      "beforeunload",
      connection.invoke("huyDat", userLogin.taiKhoan, maLichChieu)
    );
    return () => {
      connection.invoke("huyDat", userLogin.taiKhoan, maLichChieu);
      window.removeEventListener(
        "beforeunload",
        connection.invoke("huyDat", userLogin.taiKhoan, maLichChieu)
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal
        visible={timer === 0}
        width={800}
        footer={null}
        centered
        closable={false}
      >
        <p className="text-center text-base">
          {t("timeout")}
          <button
            onClick={() => handleOk()}
            className="pl-1 text-red-400 focus-within:outline-none"
          >
            {t("reBooking")}
          </button>
        </p>
      </Modal>
      <header
        className="px-4 bg-coolGray-100 text-coolGray-800 fixed bg-white text-black w-full z-10"
        style={{
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        }}
      >
        <div className="container h-16 mx-auto flex items-center">
          <NavLink
            to="/home"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              width={60}
              height={60}
              alt="homepage"
              src="./images/logoTixLoading.png"
            />
          </NavLink>
          <div
            className="space-x-3 inline-block px-4"
            style={{ width: "calc(100% - 300px)" }}
          >
            <div className="w-auto m-auto" style={{ maxWidth: 600 }}>
              <Steps
                current={current}
                percent={(100 / steps.length) * (current + 1)}
                type="navigation"
                className="custome-step"
              >
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
          </div>
          <div
            className="inline-block float-right text-right"
            style={{ width: 300 }}
          >
            <NavLink
              to="/profile"
              className="self-center px-8 py-3 hover:text-red-500"
            >
              <Avatar src="https://source.unsplash.com/100x100/?portrait" />
              <span className="pl-3">{user.hoTen}</span>
            </NavLink>
          </div>
        </div>
      </header>
      {steps[current].content}
    </div>
  );
}
