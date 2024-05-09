import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function showEsDate(date, hour = true) {
  if (hour) return dayjs(date).format("dddd DD MMMM | HH:mm a");
  return dayjs(date).format("dddd DD MMMM");
}
