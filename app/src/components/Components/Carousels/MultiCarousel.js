import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "./carouselCustomStyle.css";

const settings = {
  className: "center",
  centerMode: false,
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 4,
  speed: 500,
  rows: 2,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, position: "absolute", zIndex: 2 }}
      onClick={onClick}
    >
      <i
        className="fa fa-angle-right text-gray-300"
        aria-hidden="true"
        style={{ zIndex: 2, position: "absolute", right: 60, fontSize: 70 }}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, position: "absolute", zIndex: 2 }}
      onClick={onClick}
    >
      <i
        className="fa fa-angle-left text-gray-300"
        aria-hidden="true"
        style={{ zIndex: 2, position: "absolute", left: 60, fontSize: 70 }}
      />
    </div>
  );
}

export default function MultiCarousel({ data }) {
  const { t } = useTranslation();

  const renderItem = () => {
    return data?.map((item, idx) => {
      return (
        <NavLink
          className="p-3 hover:text-black"
          key={idx}
          to={`/details/${item.maPhim}`}
        >
          <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 transform transition duration-500 hover:scale-110">
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              className="object-cover object-center w-full rounded-t-md h-60 dark:bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-wide">
                  {item.tenPhim.length > 8
                    ? `${item.tenPhim.slice(0, 8)}...`
                    : item.tenPhim}
                </h3>
                <p className="dark:text-gray-100" style={{ minHeight: 70 }}>
                  {item.moTa.length > 60
                    ? `${item.moTa.slice(0, 60)}...`
                    : item.moTa}
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 font-semibold text-sm bg-red-400 text-white rounded-md shadow-sm hover:-translate-y-1 hover:bg-red-600 ease-in-out delay-150 transform transition duration-500 hover:scale-110"
              >
                <span className="uppercase">{t("buy")}</span>
              </button>
            </div>
          </div>
        </NavLink>
      );
    });
  };
  return <Slider {...settings}>{renderItem()}</Slider>;
}
