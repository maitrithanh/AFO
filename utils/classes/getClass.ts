"use client"
import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const GetClass = () => {
    const { data: dataUser } = useFetch(`/Auth/current`);
  const [arrRelationship, setArrRelationship] = useState("");
  const [classId, setClassId] = useState([] as string[]);
  const [getClassId, setGetClassId] = useState("");

  
  useEffect(() => {
    if (dataUser) setArrRelationship(dataUser?.relationship);
  }, [dataUser]);

  useEffect(() => {
    if (arrRelationship) {
      let arrClassId = arrRelationship?.split(/[-,,]/);
      for (let i = 0; i < arrClassId?.length; i++) {
        if (i == 1 || i == 2) {
          arrClassId.splice(i, 1);
        }
      }
      setClassId(arrClassId);
      setGetClassId(arrClassId[0].trim());
    }
  }, [arrRelationship]);

  //Lấy mảng tên lớp
  let arrClassName = arrRelationship?.split(/[-,,]/);
  for (let i = 0; i < arrClassName?.length; i++) {
    if (i == 0 || i == 1) {
      arrClassName.splice(i, 1);
    }
  }
  return {classId, getClassId, arrClassName}
}
export default GetClass;
