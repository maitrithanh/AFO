import { formatDate } from "./formatDate";

export const getMonth = (day: string) => {
  const convertDate = new Date(formatDate(day));
  const month = convertDate.getMonth() + 1;
  return month;
};

export const getDay = (day: string) => {
  const convertDate = new Date(formatDate(day));
  const toDay = convertDate.getDay();
  return toDay;
};
