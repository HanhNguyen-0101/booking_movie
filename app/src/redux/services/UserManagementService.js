import { GROUP } from "../../utils/configSetting";
import { baseService } from "./baseService";

class UserManagement extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    login(data) { // taiKhoan, matKhau
        return this.post('QuanLyNguoiDung/DangNhap', data);
    }

    thongTinTaiKhoan() {
        return this.post('QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    layDanhSachNguoiDung(taiKhoan) {
        if (taiKhoan) {
            return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${taiKhoan}`);
        }
        return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`);
    }
    
    layDanhSachLoaiNguoiDung() {
        return this.get('QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
    }

    themNguoiDung(data) {
        return this.post('QuanLyNguoiDung/ThemNguoiDung', data);
    }

    capNhapNguoiDung(data) {
        return this.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    }

    xoaThanhVien(taiKhoan) {
        return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }

    dangKi(data) {
        return this.post('QuanLyNguoiDung/DangKy', data);
    }
}

export const UserManagementService = new UserManagement();