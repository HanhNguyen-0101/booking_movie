import React, { Fragment } from "react";
import { Tabs, Avatar, Tag } from "antd";
import "./verticalTab.css";
import { formatFullDate, formatTime } from "../../../utils/formatDate";
import _ from "lodash";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

export default function VeritcalCustomTab({ data }) {
  const { t } = useTranslation();
  const renderTheaters = () => {
    if (data.heThongRapChieu && data.heThongRapChieu.length > 0) {
      return (
        <Tabs
          tabPosition="left"
          className="mx-auto w-full bg-white"
          style={{
            border: "1px solid #ebebec",
            maxHeight: 705,
            borderRadius: 4,
            padding: "30px 0",
          }}
        >
          {data.heThongRapChieu?.map((sys, idxS) => {
            return (
              <TabPane
                key={idxS}
                tab={
                  <div>
                    <Avatar src={sys.logo} size={50} className="mr-3" />
                    <span>{sys.tenHeThongRap}</span>
                  </div>
                }
              >
                {sys.cumRapChieu?.map((film, idxFilm) => {
                  let filmDate = null;
                  let filmTheater = null;
                  return (
                    <div key={idxFilm} className="pb-4 mx-4">
                      <div className="d-flex flex-row justify-content-left">
                        <Avatar
                          size={50}
                          shape="square"
                          src={film.hinhAnh}
                          alt={film.hinhAnh}
                        />
                        <div className="text-left px-2 flex flex-col justify-center">
                          <h5 className="font-weight-bold text-red-600">
                            {film.tenCumRap}
                          </h5>
                          <span className="text-gray-400 pt-1">
                            {film.diaChi}
                          </span>
                        </div>
                      </div>
                      <div className="pb-4">
                        {_.sortBy(
                          film.lichChieuPhim,
                          ["ngayChieuGioChieu", "tenRap"],
                          ["desc", "desc"]
                        )?.map((item, itemidx) => {
                          if (
                            !filmDate ||
                            filmDate !== formatFullDate(item.ngayChieuGioChieu)
                          ) {
                            filmDate = formatFullDate(item.ngayChieuGioChieu);
                            if (!filmTheater || filmTheater !== item.tenRap) {
                              filmTheater = item.tenRap;
                              return (
                                <Fragment key={itemidx}>
                                  <div className="font-weight-bold pt-4">
                                    {formatFullDate(item.ngayChieuGioChieu)}
                                  </div>
                                  <br />
                                  <span className="font-weight-bold pr-2">
                                    {item.tenRap}
                                  </span>
                                  <NavLink to={`/checkout/${item.maLichChieu}`}>
                                    <Tag className="my-1">
                                      <span style={{ color: "green" }}>
                                        {formatTime(item.ngayChieuGioChieu)} ~{" "}
                                        <span style={{ color: "gray" }}>
                                          {formatTime(
                                            item.ngayChieuGioChieu,
                                            item.thoiLuong
                                              ? item.thoiLuong / 60
                                              : item.thoiLuong
                                          )}
                                        </span>
                                      </span>
                                    </Tag>
                                  </NavLink>
                                </Fragment>
                              );
                            } else {
                              return (
                                <Fragment key={itemidx}>
                                  <div className="font-weight-bold pt-4">
                                    {formatFullDate(item.ngayChieuGioChieu)}
                                  </div>
                                  <NavLink to={`/checkout/${item.maLichChieu}`}>
                                    <Tag className="my-1">
                                      <span style={{ color: "green" }}>
                                        {formatTime(item.ngayChieuGioChieu)} ~{" "}
                                        <span style={{ color: "gray" }}>
                                          {formatTime(
                                            item.ngayChieuGioChieu,
                                            item.thoiLuong
                                              ? item.thoiLuong / 60
                                              : item.thoiLuong
                                          )}
                                        </span>
                                      </span>
                                    </Tag>
                                  </NavLink>
                                </Fragment>
                              );
                            }
                          } else {
                            if (!filmTheater || filmTheater !== item.tenRap) {
                              filmTheater = item.tenRap;
                              return (
                                <span key={itemidx}>
                                  <br />
                                  <span className="font-weight-bold pr-2">
                                    {item.tenRap}
                                  </span>
                                  <NavLink
                                    key={itemidx}
                                    to={`/checkout/${item.maLichChieu}`}
                                  >
                                    <Tag className="my-1">
                                      <span style={{ color: "green" }}>
                                        {formatTime(item.ngayChieuGioChieu)} ~{" "}
                                        <span style={{ color: "gray" }}>
                                          {formatTime(
                                            item.ngayChieuGioChieu,
                                            item.thoiLuong
                                              ? item.thoiLuong / 60
                                              : item.thoiLuong
                                          )}
                                        </span>
                                      </span>
                                    </Tag>
                                  </NavLink>
                                </span>
                              );
                            } else {
                              return (
                                <NavLink
                                  key={itemidx}
                                  to={`/checkout/${item.maLichChieu}`}
                                >
                                  <Tag className="my-1">
                                    <span style={{ color: "green" }}>
                                      {formatTime(item.ngayChieuGioChieu)} ~{" "}
                                      <span style={{ color: "gray" }}>
                                        {formatTime(
                                          item.ngayChieuGioChieu,
                                          item.thoiLuong
                                            ? item.thoiLuong / 60
                                            : item.thoiLuong
                                        )}
                                      </span>
                                    </span>
                                  </Tag>
                                </NavLink>
                              );
                            }
                          }
                        })}
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </TabPane>
            );
          })}
        </Tabs>
      );
    } else {
      return (
        <div
          className="bg-white text-black"
          style={{
            border: "1px solid #ebebec",
            borderRadius: 4,
            padding: "30px",
          }}
        >
          {t("noShowTimes")}
        </div>
      );
    }
  };
  return (
    <Tabs
      defaultActiveKey="1"
      className="p-4 custom-tabs"
      centered
      style={{
        maxWidth: 970,
        maxHeight: 705,
        padding: "10px 0",
        marginTop: 120,
        marginBottom: 120,
        color: "white",
      }}
    >
      <TabPane
        tab={
          <b className="text-white hover:text-red-500 text-xl focus:text-red-500  transform transition duration-500 hover:scale-110">
            <span className="uppercase">{t("showtimes")}</span>
          </b>
        }
        key="1"
      >
        {renderTheaters()}
      </TabPane>
      <TabPane
        tab={
          <b className="text-white hover:text-red-500 text-xl focus:text-red-500 transform transition duration-500 hover:scale-110">
            <span className="uppercase">{t("info")}</span>
          </b>
        }
        key="2"
      >
        <div
          className="mx-auto w-full bg-black text-white grid grid-cols-2"
          style={{
            border: "1px solid black",
            maxHeight: 705,
            borderRadius: 4,
            padding: "30px 50px",
          }}
        >
          <div className="col-span-1">
            <div className="row">
              <div className="col" style={{ maxWidth: 150 }}>
                <b className="pr-2">{t('name')}</b>
              </div>
              <div className="col">{data.tenPhim?.toUpperCase()}</div>
            </div>
            <div className="row">
              <div className="col" style={{ maxWidth: 150 }}>
                <b className="pr-2">{t('premiereDate')}</b>
              </div>
              <div className="col">
                {moment(data.ngayKhoiChieu).format("YYYY.MM.DD")}
              </div>
            </div>
          </div>
          <div className="col-span-1 pl-4">
            <div>
              <div className="font-bold pb-2">{t('desc')}</div>
              {data.moTa}
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
}
