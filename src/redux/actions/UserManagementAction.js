import { history } from "../../App";
import { STATUS_CODE } from "../../utils/configSetting";
import { NOTIF_TYPE, openNotification } from "../../utils/notification";
import {
  LAY_DANH_SACH_LOAI_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_THEO_TAI_KHOAN,
  LOGIN,
  LOGOUT,
  THONG_TIN_TAI_KHOAN,
} from "../constants/UserManagementConstant";
import { UserManagementService } from "../services/UserManagementService";
import { hideDrawer } from "./DrawerHOCAction";
import { hideLoading, showLoading } from "./LoadingAction";

export const login = (dataLogin) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status, data } = await UserManagementService.login(dataLogin);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: LOGIN,
          payload: { user: data.content },
        });
        if (data.content.maLoaiNguoiDung === "QuanTri") {
          history.push("/admin/users");
        } else {
          history.push("/home");
        }
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const thongTinTaiKhoan = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await UserManagementService.thongTinTaiKhoan();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: THONG_TIN_TAI_KHOAN,
          payload: { thongTinTaiKhoan: data.content },
        });
      }
    } catch (error) {
      console.log(error);
      history.push('/login');
      window.location.reload();
    }
    dispatch(hideLoading());
  };
};

export const logout = () => {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT,
    });
    history.push("/home");
    window.location.reload();
  };
};

export const layDanhSachNguoiDung = (taiKhoanSearch) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await UserManagementService.layDanhSachNguoiDung(
        taiKhoanSearch
      );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG,
          payload: { dsNguoiDung: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const layDanhSachNguoiDungTheoTaiKhoan = (taiKhoan) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await UserManagementService.layDanhSachNguoiDung(
        taiKhoan
      );
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: LAY_DANH_SACH_NGUOI_DUNG_THEO_TAI_KHOAN,
          payload: { nguoiDung: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const layDanhSachLoaiNguoiDung = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } =
        await UserManagementService.layDanhSachLoaiNguoiDung();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
          payload: { dsLoaiNguoiDung: data.content },
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const themNguoiDung = (userData) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await UserManagementService.themNguoiDung(userData);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(hideDrawer());
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new member created successfully!"
        );
        await dispatch(layDanhSachNguoiDung());
      } else {
        await openNotification(
          NOTIF_TYPE.ERROR,
          "FAIL",
          "A new member created fail!"
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};

export const capNhatNguoiDung = (userData) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await UserManagementService.capNhapNguoiDung(userData);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(hideDrawer());
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new member updated successfully!"
        );
        await dispatch(layDanhSachNguoiDung());
      } else {
        await openNotification(
          NOTIF_TYPE.ERROR,
          "FAIL",
          "A new member updated fail!"
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};
export const capNhatTaiKhoan = (userData) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await UserManagementService.capNhapNguoiDung(userData);
      if (status === STATUS_CODE.SUCCESS) {
        openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          `${userData.hoTen} updated successfully!`
        );
        dispatch(thongTinTaiKhoan());
        const userLogin = await UserManagementService.login(userData);
        if (userLogin.status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: LOGIN,
            payload: { user: userLogin.data.content },
          });
        }
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
    dispatch(hideLoading());
  };
};
export const xoaThanhVien = (taiKhoan) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await UserManagementService.xoaThanhVien(taiKhoan);
      if (status === STATUS_CODE.SUCCESS) {
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "A new member deleted successfully!"
        );
        await dispatch(layDanhSachNguoiDung());
      } else {
        await openNotification(
          NOTIF_TYPE.ERROR,
          "FAIL",
          "A new member deleted fail!"
        );
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
    dispatch(hideLoading());
  };
};

export const dangKiNguoiDung = (data) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status } = await UserManagementService.dangKi(data);
      if (status === STATUS_CODE.SUCCESS) {
        await history.push("/login");
        window.location.reload();
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "SUCCESSFULLY",
          "Congratulations! You are just a member of TIX!!!"
        );
      } else {
        await openNotification(
          NOTIF_TYPE.ERROR,
          "FAIL",
          "Sorry! Please try to register again!!!"
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
};
