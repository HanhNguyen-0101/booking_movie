import moment from "moment";

export const alphabe = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const formatFullDate = (date) => {
  return `Thứ ${convertDay(moment(date).format('d'))}, ${moment(date).format("DD")} tháng ${moment(date).format(
    "MM"
  )}, ${moment(date).format("YYYY")}`;
};

export const formatTime = (time, timeAdd) => {
  if (timeAdd) {
    return moment(time).add(timeAdd, 'hours').format('hh:mm');
  } else {
    return moment(time).format('hh:mm');
  }
}

export const convertDay = (dayNumber) => {
  switch (dayNumber) {
    case '0':
        return "Hai";
    case '1':
      return "Ba";
    case '2':
      return "Tư";
    case '3':
      return "Năm";
    case '4':
      return "Sáu";
    case '5':
      return "Bảy";
    case '6':
      return "Chủ nhật";
    default:
      return "";
  }
};
