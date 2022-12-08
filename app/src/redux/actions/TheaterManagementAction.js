import { STATUS_CODE } from "../../utils/configSetting";
import {
  GET_INFORMATION_OF_RELEASE_FILM,
  GET_INFORMATION_OF_THEATERS,
  GET_INFORMATION_OF_THEATERS_BY_SYSTEM,
  GET_INFORMATION_OF_THEATER_BY_FILM,
} from "../constants/TheaterManagementConstant";
import { TheaterManagementService } from "../services/TheaterManagementService";

export const getInformationOfTheaters = () => {
  return async (dispatch) => {
    try {
      const { status, data } =
        await TheaterManagementService.getInformationOfTheaters();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_INFORMATION_OF_THEATERS,
          payload: { theaters: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInformationOfTheatersBySystem = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const { status, data } =
        await TheaterManagementService.getInformationOfTheatersBySystem(
          maHeThongRap
        );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_INFORMATION_OF_THEATERS_BY_SYSTEM,
          payload: { theatersSys: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInformationOfReleaseFilm = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const { status, data } =
        await TheaterManagementService.getInformationOfReleaseFilm(
          maHeThongRap
        );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_INFORMATION_OF_RELEASE_FILM,
          payload: { releaseFilms: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInformationOfTheatersByFilm = (filmId) => {
  return async (dispatch) => {
    try {
      const { status, data } =
        await TheaterManagementService.getInformationThearterByFilm(
          filmId
        );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_INFORMATION_OF_THEATER_BY_FILM,
          payload: { theatersByFilm: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};