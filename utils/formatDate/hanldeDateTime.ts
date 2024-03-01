import { toYMD } from "../dateTime";

export const hanldeDateTime = (date: any, time: any) => {
   return(toYMD(date) + "T" + time);
  };