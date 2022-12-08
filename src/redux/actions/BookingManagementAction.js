import { connection } from "../..";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import {
  BOOKING_SEAT,
  BOOKING_TICKET,
  GET_BOOKING_LIST,
  UPDATE_BOOKING_FROM_OTHER_CLIENT,
} from "../constants/BookingManagementConstant";
import { BookingManagementService } from "../services/BookingManagementService";
import { hideDrawer } from "./DrawerHOCAction";
import { getFilmList } from "./FilmManagementAction";
import { hideLoading, showLoading } from "./LoadingAction";
import { thongTinTaiKhoan } from "./UserManagementAction";

export const getBookingList = (maLichChieu) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await BookingManagementService.getBookingList(
        maLichChieu
      );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_BOOKING_LIST,
          payload: { chiTietPhongVe: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const bookingSeat = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    try {
      await dispatch({
        type: BOOKING_SEAT,
        payload: {ghe}
      });

      let {bookingSeatList} = getState().BookingManagementReducer;
      let {userLogin} = getState().UserManagementReducer;

      connection.invoke('datGhe', userLogin.taiKhoan, JSON.stringify(bookingSeatList), maLichChieu);

    } catch (error) {
      console.log(error);
    }
  }
};

export const bookingTicket = (dataTicket) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { data, status } = await BookingManagementService.bookingTicket(
        dataTicket
      );
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch({
          type: BOOKING_TICKET,
          payload: { booking: data.content },
        });
        await dispatch(thongTinTaiKhoan());
        let {userLogin} = getState().UserManagementReducer;
        connection.invoke('datGheThanhCong', userLogin.taiKhoan, dataTicket.maLichChieu);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const updateBookingFormOtherClient = (data) => ({
  type: UPDATE_BOOKING_FROM_OTHER_CLIENT,
  payload: {customerBooking: data}
});

export const createShowtimes = (data) => {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const {status} = await BookingManagementService.createShowtimes(data);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(hideDrawer());
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new showtimes of movie created successfully!"
        );
        await dispatch(getFilmList());
      } else {
        await openNotification(NOTIF_TYPE.ERROR, "FAIL", "A new showtime of movie created fail!");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  }
}