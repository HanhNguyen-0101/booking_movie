import {
  GET_INFORMATION_OF_RELEASE_FILM,
  GET_INFORMATION_OF_THEATERS,
  GET_INFORMATION_OF_THEATERS_BY_SYSTEM,
  GET_INFORMATION_OF_THEATER_BY_FILM,
} from "../constants/TheaterManagementConstant";

const initialState = {
  theaters: [],
  theatersSys: [],
  releaseFilms: [],
  theatersByFilm: []
};

export const TheaterManagementReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_INFORMATION_OF_THEATERS: {
      return { ...state, theaters: payload.theaters };
    }
    case GET_INFORMATION_OF_THEATERS_BY_SYSTEM: {
      return { ...state, theatersSys: payload.theatersSys };
    }
    case GET_INFORMATION_OF_RELEASE_FILM: {
      return { ...state, releaseFilms: payload.releaseFilms };
    }
    case GET_INFORMATION_OF_THEATER_BY_FILM: {
      return { ...state, theatersByFilm: payload.theatersByFilm };
    }
    default:
      return state;
  }
};
