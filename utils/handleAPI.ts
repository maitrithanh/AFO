import axios from 'axios'

const baseUrl = "https://afo-enroll-backend.onrender.com/enroll"

const addEnroll = (data:any) => {
    axios
    .post(`${baseUrl}/addEnroll`, data)
    .then((data) => {
        console.log("Add: ", data)
        
    })
    .catch((err) => console.log(err))
}

const searchEnroll = (search:any, setDataSearch: any) => {
    axios
    .get(`${baseUrl}/searchEnroll?phone=${search}`)
    .then((data) => {
        // console.log("Search: ", data.data.data)
        setDataSearch(data.data.data)
        return data.data.data
    })
    .catch((err) => console.log(err))
}


const getAllEnroll = (setDataEnroll: any) => {
    axios
    .get(`${baseUrl}/getAllEnroll`)
    .then((data) => {
        // console.log("Search: ", data.data.data)
        setDataEnroll(data.data)        
        return data.data
    })
    .catch((err) => console.log(err))
}

const updateStatusEnroll = (_id: string) => {
    axios
    .post(`${baseUrl}/updateStatusEnroll`, {_id})
    .then((data) => {
        console.log("Update: ", data)
        console.log(_id);
        
    })
    .catch((err) => console.log(err))
}

export {addEnroll, searchEnroll, getAllEnroll, updateStatusEnroll}