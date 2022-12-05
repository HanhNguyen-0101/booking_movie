import { TOKEN, USER_LOGIN } from "../../utils/configSetting";
import {
  LAY_DANH_SACH_LOAI_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_THEO_TAI_KHOAN,
  LOGIN,
  LOGOUT,
  THONG_TIN_TAI_KHOAN,
} from "../constants/UserManagementConstant";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  thongTinTaiKhoan: {},
  dsNguoiDung: [],
  dsLoaiNguoiDung: [],
  nguoiDung: [],
};

export const UserManagementReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOGIN: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(payload.user));
      localStorage.setItem(TOKEN, payload.user.accessToken);
      return { ...state, userLogin: payload.user };
    }
    case THONG_TIN_TAI_KHOAN: {
      return { ...state, thongTinTaiKhoan: payload.thongTinTaiKhoan };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TOKEN);
      return { ...state, userLogin: {} };
    }
    case LAY_DANH_SACH_NGUOI_DUNG: {
      return { ...state, dsNguoiDung: payload.dsNguoiDung };
    }
    case LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
      return { ...state, dsLoaiNguoiDung: payload.dsLoaiNguoiDung };
    }
    case LAY_DANH_SACH_NGUOI_DUNG_THEO_TAI_KHOAN: {
      return { ...state, nguoiDung: payload.nguoiDung };
    }
    default:
      return state;
  }
};
