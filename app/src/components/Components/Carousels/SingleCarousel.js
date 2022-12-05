import React from "react";
import Slider from "react-slick";
import './carouselCustomStyle.css';

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

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  cssEase: "linear",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  appendDots: (dots) => (
    <div style={{ position: "absolute", bottom: 10 }}>
      <ul> {dots} </ul>
    </div>
  ),
};

export default function SingleCarousel({ data }) {
  const renderItem = () => {
    return data?.map((item, idx) => {
      return (
        <img
          key={idx}
          style={{
            backgroundImage: `url(${item.hinhAnh})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
          src={item.hinhAnh}
          alt={item.hinhAnh}
        />
      );
    });
  };
  return <Slider {...settings}>{renderItem()}</Slider>;
}
