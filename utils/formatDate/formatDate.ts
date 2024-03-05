export const reformatDateString = (date: string) => {
    var b = date?.split(/\D/);
    return b?.reverse().join("-");
  }
  export const formatDate = (date: string) => {
    var d = new Date(reformatDateString(date)),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  export const toMDY = (date: string) => {
    var d = new Date(reformatDateString(date)),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  }