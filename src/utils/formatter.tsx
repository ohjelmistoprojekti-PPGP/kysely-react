import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD.MM.YYYY");
};
