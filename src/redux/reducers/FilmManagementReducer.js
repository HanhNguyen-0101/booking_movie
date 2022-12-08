import {
  GET_BANNER_LIST,
  GET_FILM_BY_ID,
  GET_FILM_LIST,
  GET_FILM_PLAYING_LIST,
  GET_FILM_UPCOMING_LIST,
} from "../constants/FilmManagementConstant";

const initialState = {
  bannerList: [],
  filmList: [],
  filmPlayingList: [],
  filmUpcomingList: [],
  filmListActive: [],
  film: [],
};

export const FilmManagementReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_BANNER_LIST: {
      return { ...state, bannerList: payload.bannerList };
    }
    case GET_FILM_LIST: {
      return {
        ...state,
        filmList: payload.filmList,
        filmListActive: payload.filmList,
      };
    }
    case GET_FILM_PLAYING_LIST: {
      let filmPlayingList = state.filmList?.filter((i) => i.dangChieu);
      return {
        ...state,
        filmPlayingList,
        filmListActive: filmPlayingList,
      };
    }
    case GET_FILM_UPCOMING_LIST: {
      let filmUpcomingList = state.filmList?.filter((i) => i.sapChieu);
      return {
        ...state,
        filmUpcomingList,
        filmListActive: filmUpcomingList,
      };
    }
    case GET_FILM_BY_ID: {
      return { ...state, film: payload.film };
    }
    default:
      return state;
  }
};
