import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { BookingManagementReducer } from "./reducers/BookingManagementReducer";
import { DrawerHOCReducer } from "./reducers/DrawerHOCReducer";
import { FilmManagementReducer } from "./reducers/FilmManagementReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { TheaterManagementReducer } from "./reducers/TheaterManagementReducer";
import { UserManagementReducer } from "./reducers/UserManagementReducer";

const rootReducer = combineReducers({
  LoadingReducer,
  FilmManagementReducer,
  TheaterManagementReducer,
  UserManagementReducer,
  BookingManagementReducer,
  DrawerHOCReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
