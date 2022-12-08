import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import MultiCarousel from "../../../components/Components/Carousels/MultiCarousel";
import SingleCarousel from "../../../components/Components/Carousels/SingleCarousel";
import VerticalTab from "../../../components/Components/Tabs/VerticalTab";
import {
  getBannerList,
  getFilmList,
  getFilmPlayingList,
  getFilmUpcomingList,
} from "../../../redux/actions/FilmManagementAction";
import { getInformationOfReleaseFilm } from "../../../redux/actions/TheaterManagementAction";

export default function HomePage() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [state, setState] = useState({
    dangChieu: false,
    sapChieu: false,
  });

  const { bannerList, filmListActive } = useSelector(
    (state) => state.FilmManagementReducer
  );
  const { releaseFilms } = useSelector(
    (state) => state.TheaterManagementReducer
  );

  useEffect(() => {
    dispatch(getBannerList());
    dispatch(getFilmList());
    dispatch(getInformationOfReleaseFilm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <SingleCarousel data={bannerList} />
      </div>
      <div className="container mt-5">
        <div className="flex justify-center">
          <Button
            className={
              state.dangChieu
                ? "font-bold text-red-400 hover:text-red-400 text-xl px-8 transform transition duration-500 hover:scale-110"
                : "ease-in-out delay-150 text-black hover:text-red-400 text-xl px-8 transform transition duration-500 hover:scale-110"
            }
            type="link"
            onClick={() => {
              dispatch(getFilmPlayingList());
              setState({ ...state, dangChieu: true, sapChieu: false });
            }}
          >
            {t('showing')}
          </Button>
          <Button
            className={
              state.sapChieu
                ? "font-bold text-red-400 hover:text-red-400 text-xl px-8 transform transition duration-500 hover:scale-110"
                : "ease-in-out delay-150 text-black hover:text-red-400 text-xl px-8 transform transition duration-500 hover:scale-110"
            }
            type="link"
            onClick={() => {
              dispatch(getFilmUpcomingList());
              setState({ ...state, dangChieu: false, sapChieu: true });
            }}
          >
            {t('coming')}
          </Button>
        </div>
        <div style={{ maxWidth: 1200 }} className="mx-auto mt-4 multi-carousel-homepage">
          <MultiCarousel data={filmListActive} />
        </div>
        <VerticalTab data={releaseFilms} />
      </div>
    </div>
  );
}
