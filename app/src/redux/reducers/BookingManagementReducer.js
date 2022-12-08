import {
  BOOKING_SEAT,
  BOOKING_TICKET,
  GET_BOOKING_LIST,
  UPDATE_BOOKING_FROM_OTHER_CLIENT,
} from "../constants/BookingManagementConstant";

const initialState = {
  chiTietPhongVe: {},
  bookingSeatList: [],
  customerBooking: [],
};

export const BookingManagementReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_BOOKING_LIST: {
      return { ...state, chiTietPhongVe: payload.chiTietPhongVe };
    }
    case BOOKING_SEAT: {
      let bookingSeatList = [...state.bookingSeatList];
      const index = state.bookingSeatList.findIndex(
        (i) => i.maGhe === payload.ghe.maGhe
      );
      if (index !== -1) {
        bookingSeatList = bookingSeatList.filter(
          (i) => i.maGhe !== payload.ghe.maGhe
        );
      } else {
        bookingSeatList.push(payload.ghe);
      }
      return { ...state, bookingSeatList };
    }
    case BOOKING_TICKET: {
      return { ...state, bookingSeatList: [] };
    }
    case UPDATE_BOOKING_FROM_OTHER_CLIENT: {
      return { ...state, customerBooking: payload.customerBooking };
    }
    default:
      return state;
  }
};
