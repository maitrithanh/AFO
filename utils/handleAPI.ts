import axios from "axios";
import { callApiWithToken } from "./callApi";

// const baseUrl = "https://afo-enroll-backend.onrender.com/enroll"
const baseUrl = "http://localhost:5005";

const addEnroll = (data: any) => {
  axios
    .post(`${baseUrl}/enroll/addEnroll`, data)
    .then((data) => {
      console.log("Add: ", data);
    })
    .catch((err) => console.log(err));

  callApiWithToken().post("mail/sendNewRegister", data);
};

const searchEnroll = (search: any, setDataSearch: any) => {
  axios
    .get(`${baseUrl}/enroll/searchEnroll?phone=${search}`)
    .then((data) => {
      // console.log("Search: ", data.data.data)
      setDataSearch(data.data.data);
      return data.data.data;
    })
    .catch((err) => console.log(err));
};

const getAllEnroll = (setDataEnroll: any) => {
  axios
    .get(`${baseUrl}/enroll/getAllEnroll`)
    .then((data) => {
      // console.log("Search: ", data.data.data)
      setDataEnroll(data.data);
      return data.data;
    })
    .catch((err) => console.log(err));
};

const updateStatusEnroll = (_id: string) => {
  axios
    .post(`${baseUrl}/enroll/updateStatusEnroll`, { _id })
    .then((data) => {
      console.log("Update: ", data);
      console.log(_id);
    })
    .catch((err) => console.log(err));
};

const sendConfirmationEmail = (data: any) => {
  callApiWithToken().post("mail/sendConfirmation", data);
};

//Add History Attendance

const addAttendanceHistory = (data: any) => {
  axios
    .post(`${baseUrl}/ah/add-attendance-history`, data)
    .then((data) => {
      console.log("Add History Attendance: ", data);
    })
    .catch((err) => console.log(err));
};

const searchAtt = (search: any, setDataSearch: any) => {
  axios
    .get(`${baseUrl}/ah/search-attendance-history?idDate=${search}`)
    .then((data) => {
      // console.log("Search: ", data.data.data)
      setDataSearch(data.data.data);
      return data.data.data;
    })
    .catch((err) => console.log(err));
};

export {
  addEnroll,
  searchEnroll,
  getAllEnroll,
  updateStatusEnroll,
  sendConfirmationEmail,
  addAttendanceHistory,
  searchAtt,
};
