"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/utils/useFetch";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import DefaultImage from "@/app/components/shared/defaultImage";
import DialogProfile from "../../profile/DialogProfile";
import { getImageUrl } from "@/utils/image";
import GetClass from "@/utils/classes/getClass";
import { CiCircleMore } from "react-icons/ci";
import { MdCalendarMonth } from "react-icons/md";
import { useRouter } from "next/navigation";
import TableTemplate, { TableTemplateColumn } from "../../shared/TableTemplate";

const ClassesTable = () => {
  const { t } = useTranslation();
  const [closeDialog, setCloseDialog] = useState(false);
  const [dataStudentDetail, setDataStudentDetail] = useState({});
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const { data: dataUser } = useFetch(`Auth/current`);

  const day = new Date();
  const year = day.getFullYear();

  const { data: detailClassData } = useFetch(
    `ClassRoom/Detail/id=${dataUser?.classId}&year=${year}`
  );

  const handleDialog = () => {
    setCloseDialog((currState) => !currState);
  };

  const searchChildInClass = (c: any): boolean => {
    const matchName: boolean = c.fullName.toLowerCase().includes(search);
    const matchPhone: boolean = c.phone.includes(search);
    return matchName || matchPhone;
  };

  const Columns: TableTemplateColumn[] = [
    {
      title: "Mã trẻ",
      getData: (x) => x.id,
      width: "180",
    },
    {
      title: "Hình",
      getData: (x) => (
        <div className=" scale-125 w-[50px] h-[50px]">
          <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
        </div>
      ),
      width: "80",
    },
    {
      title: "Họ tên",
      getData: (x) => x.fullName,
    },
    {
      title: t("dateOfBirth"),
      getData: (x) => x.birthDay,
    },
    {
      title: t("phoneNumber"),
      getData: (x) => x.phone,
    },
    {
      title: " Người giám hộ",
      getData: (x) => x.parentName,
    },
  ];

  return (
    <>
      {closeDialog ? (
        <DialogProfile
          handleDialog={handleDialog}
          dataProps={dataStudentDetail}
          teacher
          // setRefresh={setRefresh((b) => b)}
        />
      ) : (
        ""
      )}
      <div className=" bg-white md:w-full h-[88vh] overflow-auto m-auto rounded-xl">
        <div className="relative overflow-x-auto shadow-sm bg-white pt-2 sm:rounded-lg">
          <div>
            <div className="absolute right-4 top-14">
              <p className="md:text-xl flex items-center">
                Giáo viên chủ nhiệm:
                {detailClassData?.teachers.map((teacher: any) => {
                  return (
                    <span
                      className={`italic ml-2 flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-md`}
                      key={teacher.teacherID}
                    >
                      <DefaultImage
                        img={getImageUrl(teacher.avatar)}
                        fallback="/avatar.webp"
                      />
                      {teacher.fullName}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <TableTemplate
            title={`Danh sách trẻ lớp ${detailClassData?.name} - số lượng: ${detailClassData?.count}`}
            dataSource={detailClassData?.students || []}
            columns={Columns}
            searchColumns={[Columns[1]]}
            searchPlaceHolder="Tìm kiếm..."
            // addButton={{ link: "#" }}
            actions={[
              {
                icon: (
                  <span className="text-black">
                    <CiCircleMore size={24} />
                  </span>
                ),
                onClick: (x) => {
                  setDataStudentDetail({
                    avatar: x.avatar,
                    id: x.id,
                  });
                  setCloseDialog(true);
                },
              },
            ]}
            // extraElementsToolBar={selectMonth}
          />
        </div>
      </div>
    </>
  );
};

export default ClassesTable;
