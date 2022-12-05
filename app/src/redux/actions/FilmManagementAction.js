import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import {
  GET_BANNER_LIST,
  GET_FILM_BY_ID,
  GET_FILM_LIST,
  GET_FILM_PLAYING_LIST,
  GET_FILM_UPCOMING_LIST,
} from "../constants/FilmManagementConstant";
import { FilmManagementService } from "../services/FilmManagementService";
import { hideDrawer } from "./DrawerHOCAction";
import { hideLoading, showLoading } from "./LoadingAction";

export const getBannerList = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status, data } = await FilmManagementService.getBannerList();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_BANNER_LIST,
          payload: { bannerList: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const getFilmList = (searchText) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await FilmManagementService.getFilmList(searchText);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_LIST,
          payload: { filmList: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const getFilmPlayingList = () => ({
  type: GET_FILM_PLAYING_LIST,
});

export const getFilmUpcomingList = () => ({
  type: GET_FILM_UPCOMING_LIST,
});

export const getFilmById = (filmId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await FilmManagementService.getFilmById(filmId);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_BY_ID,
          payload: { film: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const createFilm = (formData) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await FilmManagementService.createFilm(formData);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(hideDrawer());
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new movie created successfully!"
        );
        await dispatch(getFilmList());
      } else {
        await openNotification(NOTIF_TYPE.ERROR, "FAIL", "A new movie created fail!");
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
    dispatch(hideLoading());
  };
};

export const editFilm = (formData) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await FilmManagementService.editFilm(formData);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(hideDrawer());
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new movie updated successfully!"
        );
        await dispatch(getFilmList());
      } else {
        await openNotification(NOTIF_TYPE.ERROR, "FAIL", "A new movie updated fail!");
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
    dispatch(hideLoading());
  };
};

export const deleteFilm = (maPhim) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await FilmManagementService.deleteFilm(maPhim);
      if (status === STATUS_CODE.SUCCESS) {
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new movie deleted successfully!"
        );
        await dispatch(getFilmList());
      } else {
        await openNotification(NOTIF_TYPE.ERROR, "FAIL", "A new movie deleted fail!");
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
    dispatch(hideLoading());
  };
};