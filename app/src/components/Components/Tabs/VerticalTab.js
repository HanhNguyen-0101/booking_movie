import React, { Fragment } from "react";
import { Tabs, Avatar, Tag } from "antd";
import { useDispatch } from "react-redux";
import { getInformationOfTheatersBySystem } from "../../../redux/actions/TheaterManagementAction";
import { formatFullDate, formatTime } from "../../../utils/formatDate";
import "./verticalTab.css";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function VerticalTab({ data, content }) {
  const dispatch = useDispatch();
  const renderTheaters = () => {
    return data?.map((theater, index) => {
      return (
        <TabPane
          tab={
            <Avatar
              src={theater.logo}
              size={50}
              onClick={() =>
                dispatch(getInformationOfTheatersBySystem(theater.maHeThongRap))
              }
            />
          }
          key={theater.maHeThongRap}
        >
          <Tabs tabPosition="left">
            {theater.lstCumRap?.map((i, idx) => {
              return (
                <TabPane
                  tab={
                    <div className="d-flex flex-row justify-content-left">
                      <Avatar
                        size={50}
                        shape="square"
                        src={i.hinhAnh}
                        alt={i.tenCumRap}
                      />
                      <div className="text-left px-2">
                        <h5
                          style={{
                            width: 280,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {i.tenCumRap}
                        </h5>
                        <p
                          className="hover:text-black"
                          style={{
                            width: 280,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {i.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={`${theater.maHeThongRap}-${i.maCumRap}`}
                >
                  {i.danhSachPhim
                    ?.filter((film) => film.dangChieu)
                    ?.map((film, idxFilm) => {
                      let filmDate = null;
                      return (
                        <div
                          key={`${theater.maHeThongRap}-${i.maCumRap}-${film.maPhim}`}
                          className="pb-4 mx-4"
                        >
                          <div className="d-flex flex-row justify-content-left">
                            <Avatar
                              size={50}
                              shape="square"
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                            />
                            <div className="text-left px-2">
                              <h5 className="font-weight-bold">
                                {film.tenPhim}
                              </h5>
                            </div>
                          </div>
                          <div className="pb-4">
                            {film.lstLichChieuTheoPhim?.map((item, itemidx) => {
                              if (
                                !filmDate ||
                                filmDate !==
                                  formatFullDate(item.ngayChieuGioChieu)
                              ) {
                                filmDate = formatFullDate(
                                  item.ngayChieuGioChieu
                                );
                                return (
                                  <Fragment key={itemidx}>
                                    <div className="font-weight-bold pt-3">
                                      {formatFullDate(item.ngayChieuGioChieu)}
                                    </div>
                                    <NavLink to={`/checkout/${item.maLichChieu}`}>
                                      <Tag className="mt-1">
                                        <span style={{ color: "green" }}>
                                          {formatTime(item.ngayChieuGioChieu)}
                                        </span>
                                      </Tag>
                                    </NavLink>
                                  </Fragment>
                                );
                              } else {
                                return (
                                  <NavLink
                                    to={`/checkout/${item.maLichChieu}`}
                                    key={itemidx}
                                  >
                                    <Tag className="mt-1">
                                      <span style={{ color: "green" }}>
                                        {formatTime(item.ngayChieuGioChieu)}
                                      </span>
                                    </Tag>
                                  </NavLink>
                                );
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
        </TabPane>
      );
    });
  };
  return (
    <Tabs
      tabPosition="left"
      className="mx-auto w-full"
      style={{
        maxWidth: 970,
        border: "1px solid #ebebec",
        maxHeight: 705,
        borderRadius: 4,
        padding: "10px 0",
        marginTop: 120,
        marginBottom: 120,
      }}
    >
      {renderTheaters()}
    </Tabs>
  );
}
