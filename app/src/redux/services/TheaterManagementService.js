import { GROUP } from "../../utils/configSetting";
import { baseService } from "./baseService";

class TheaterManagement extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getInformationOfTheaters() {
    return this.get("QuanLyRap/LayThongTinHeThongRap");
  }
  getInformationOfTheatersBySystem(maHeThongRap) {
    return this.get(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  }
  getInformationOfReleaseFilm(maHeThongRap) {
    return this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?${maHeThongRap ? 'maHeThongRap=' + maHeThongRap + '&' : ''}maNhom=${GROUP}`)
  }

  getInformationThearterByFilm(filmId) {
    return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmId}`);
  }
}

export const TheaterManagementService = new TheaterManagement();
