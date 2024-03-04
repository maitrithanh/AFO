"use client"
import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const GetAttendanceClass = (defaultClassID:any) => {
    const { data: dataAttendanceByClassID } = useFetch(
        `CheckIn/getByClassId?classId=${defaultClassID}`
      );
  const [arrGetAttendanceByClass, setArrGetAttendanceByClass] = useState([] as string[]);
  const [nameAttendanceByClassFirst, setNameAttendanceByClassFirst] = useState("");
  const [idAttendanceByClassFirst, setIdAttendanceByClassFirst] = useState("");


  useEffect(() => {
    if (dataAttendanceByClassID) {
      setArrGetAttendanceByClass(dataAttendanceByClassID)
      setNameAttendanceByClassFirst(dataAttendanceByClassID[0]?.classOfDay)
      setIdAttendanceByClassFirst(dataAttendanceByClassID[0]?.id)
    }
  }, [dataAttendanceByClassID]);


  return {arrGetAttendanceByClass, nameAttendanceByClassFirst, idAttendanceByClassFirst}
}
export default GetAttendanceClass;
