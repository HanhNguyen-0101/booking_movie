import { GROUP } from "../../utils/configSetting";
import { baseService } from "./baseService";

class FilmManagement extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    getBannerList() {
        return this.get('QuanLyPhim/LayDanhSachBanner');
    }

    getFilmList(searchText) {
        if (searchText) {
            return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${searchText}`)
        }
        return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`);
    }

    getFilmById(filmId) {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`);
    }

    createFilm(formData) {
        return this.post('QuanLyPhim/ThemPhimUploadHinh', formData);
    }
    editFilm(formData) {
        return this.post('QuanLyPhim/CapNhatPhimUpload', formData);
    }

    deleteFilm(maPhim) {
        return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
}

export const FilmManagementService = new FilmManagement();