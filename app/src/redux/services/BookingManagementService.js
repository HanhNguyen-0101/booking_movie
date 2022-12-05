import { baseService } from "./baseService";

class BookingManagement extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getBookingList(maLichChieu) {
        return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    bookingTicket(data) {
        return this.post('QuanLyDatVe/DatVe', data);
    }

    createShowtimes(data) {
        return this.post('QuanLyDatVe/TaoLichChieu', data);
    }
}
export const BookingManagementService = new BookingManagement();