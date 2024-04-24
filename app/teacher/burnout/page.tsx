"use client";

import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BackAction from "@/app/components/admin/BackAction";
import { useSearchParams } from "next/navigation";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { FaCheck } from "react-icons/fa6";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã yêu cầu",
    getData: (x) => x.reqId,
  },
  {
    title: "Hình",
    getData: (x) => (
      <div className=" scale-125 w-[50px] h-[50px]">
        <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
      </div>
    ),
    width: "60",
  },
  {
    title: "Họ tên",
    getData: (x) => x.fullName,
  },
  {
    title: "Lý do",
    getData: (x) => x.reason,
  },
  {
    title: "Ngày nghỉ",
    getData: (x) => (
      <p>
        {x.startTime} - {x.endTime}
      </p>
    ),
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.isActive ? (
        <span className="text-green-600">Đã duyệt</span>
      ) : (
        <span className="text-yellow-600">Chờ duyệt</span>
      ),
  },
];

const BurnOutPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [refresh, setRefresh] = useState(false);
  const [childID, setChildID] = useState("");

  const { data: currentUserTeacher } = useFetch("Auth/current");

  const { data: classData } = useFetch(
    `CheckIn/getRequest?classId=${currentUserTeacher?.classId}&month=${month}`,
    refresh
  );
  const { data: childData } = useFetch(`Child/getChild?id=${childID}`);

  const months = [];
  for (var i = 1; i <= 12; i++) months.push(i);
  const selectMonth = (
    <div className="bg-gray-100 shadow-sm rounded-lg">
      <Select
        onValueChange={(value: any) => {
          setMonth(value);
        }}
      >
        <SelectTrigger className="w-[180px] text-lg">
          <p>Tháng:</p>
          <SelectValue placeholder={month} defaultValue={month} />
        </SelectTrigger>
        <SelectContent>
          {months.map((x) => (
            <>
              <SelectItem value={x + ""}>{x}</SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const hanldeAccept = (idReq: string) => {
    callApiWithToken()
      .put(`CheckIn/putRequest?reqID=${idReq}`)
      .then((response) => {
        toast.success("Đã duyệt");
        setRefresh(true);
        callApiWithToken()
          .post(
            `Notification/sendUser`,
            {
              PhoneNumber: childData?.parent?.phoneNumber,
              Title: "Đơn xin nghỉ đã được duyệt",
              Content: `Đơn xin nghỉ có mã:${idReq} đã được duyệt`,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {})
          .catch((errors) => {
            toast.error("Có lỗi", errors);
          });
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  // const handleSendNotiChangeClass = (idReq: string) => {
  //   callApiWithToken()
  //     .post(
  //       `Notification/sendUser`,
  //       {
  //         PhoneNumber: childData?.parent?.phoneNumber,
  //         Title: "Đơn xin nghỉ đã được duyệt",
  //         Content: `Đơn xin nghỉ có mã:${idReq} đã được duyệt`,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((response) => {})
  //     .catch((errors) => {
  //       toast.error("Có lỗi", errors);
  //     });
  // };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full bg-white p-4 rounded-md h-[88vh] overflow-auto">
        <TableTemplate
          title={`Danh sách xin nghỉ của lớp ${currentUserTeacher?.className}`}
          dataSource={classData || []}
          columns={Columns}
          searchColumns={[Columns[0], Columns[2]]}
          searchPlaceHolder="Tìm kiếm..."
          // addButton={{ link: "#" }}
          actions={[
            {
              icon: <FaCheck size={24} />,
              onClick: (x) => {
                if (!x.isActive) {
                  setChildID(x.childId);
                  if (childID != "") {
                    hanldeAccept(x.reqId);
                  }
                }
              },
            },
          ]}
          extraElementsToolBar={selectMonth}
        />
        <div className="w-full flex justify-center items-center">
          {classData?.length > 0 ? null : "Không có dữ liệu"}
        </div>
      </div>
    </div>
  );
};

export default BurnOutPage;
