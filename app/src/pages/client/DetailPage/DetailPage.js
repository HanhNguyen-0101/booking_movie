import React, { useEffect, useState } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import Circle from "../../../components/Components/Circle/Circle";
import VeritcalCustomTab from "../../../components/Components/Tabs/VeritcalCustomTab";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReactPlayer from "react-player";
import { Modal } from "antd";
import { getInformationOfTheatersByFilm } from "../../../redux/actions/TheaterManagementAction";
import { useTranslation } from "react-i18next";

export default function DetailPage(props) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const { theatersByFilm } = useSelector((state) => state.TheaterManagementReducer);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const { maPhim } = props.match.params;
    dispatch(getInformationOfTheatersByFilm(maPhim));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ backgroundImage: `url(${theatersByFilm.hinhAnh})` }}>
      <CustomCard
        style={{ borderRadius: 0 }}
        effectColor="#000000" // required
        blur={15} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div style={{ maxWidth: 970, margin: "auto", padding: "70px 0" }}>
          <div className="intoFilm grid grid-cols-4">
            <div
              className="col-span-1 relative first-img cursor-pointer"
              onClick={showModal}
            >
              <img alt="film" src={theatersByFilm.hinhAnh} />
              <img
                alt="play"
                src="./images/play-video.png"
                className="absolute"
                style={{
                  display: "none",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            </div>
            <div className="col-span-2 px-4">
              <p className="text-lg">
                {moment(theatersByFilm.ngayKhoiChieu).format("YYYY.MM.DD")}
              </p>
              <p className="text-xl pb-2">
                <b>{theatersByFilm.tenPhim?.toUpperCase()}</b>
              </p>
              <p className="text-lg">
                {theatersByFilm.moTa?.length > 300
                  ? `${theatersByFilm.moTa.slice(0, 300)}...`
                  : theatersByFilm.moTa}
              </p>
              <button className="bg-red-600 text-lg text-white font-bold py-1 mt-4 px-4 rounded transform transition duration-500 hover:scale-110">
                <span className="uppercase">{t('buy')}</span>
              </button>
            </div>
            <div className="col-span-1">
              <Circle percent={theatersByFilm.danhGia} />
            </div>
          </div>
          <div className="suatChieu">
            <VeritcalCustomTab data={theatersByFilm} />
          </div>
          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            className="w-auto h-auto flex justify-center f-play-video"
          >
            <ReactPlayer
              url={theatersByFilm.trailer}
              playing={isModalVisible}
              width={900}
              height={500}
              style={{ margin: "auto" }}
            />
          </Modal>
        </div>
      </CustomCard>
    </div>
  );
}
