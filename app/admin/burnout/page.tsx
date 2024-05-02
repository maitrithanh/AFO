"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BackAction from "@/app/components/admin/BackAction";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { FaCheck } from "react-icons/fa6";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã yêu cầu",
    getData: (x) => x.reqId,
  },
  {
    title: "Hình",
    getData: (x) => (
      <div className="scale-125">
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

const activeOptions: FilterOptions[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Đã duyệt",
    filter: (obj) => obj.isActive == true,
  },
  {
    value: "Chưa duyệt",
    filter: (obj) => obj.isActive == false,
  },
];

const filterActive: TableTemplateFilter = {
  name: "Trạng thái",
  options: activeOptions,
};

const BurnOutPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [refresh, setRefresh] = useState(false);
  const [childID, setChildID] = useState("");

  const handlRefresh = () => {
    setRefresh(true);
    if (refresh === true) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  //refresh data every 2s
  // setInterval(() => {
  //   handlRefresh();
  // }, 2000);

  const { data: classData } = useFetch(`CheckIn/getAllRequest`, refresh);
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
        Swal.fire({
          title: "Đã duyệt",
          icon: "success",
          confirmButtonText: "Đóng",
          confirmButtonColor: "#F8853E",
          showConfirmButton: false,
          timer: 1500,
        });
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
            Swal.fire({
              title: "Có lỗi xảy ra!",
              text: errors,
              icon: "error",
              confirmButtonText: "Đóng",
              confirmButtonColor: "#F8853E",
            });
          });
        setRefresh(true);
        handlRefresh();
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
  //       toast.error(errors, errors);
  //     });
  // };
  return (
    <>
      <TableTemplate
        title={`Danh sách xin nghỉ`}
        dataSource={classData || []}
        columns={Columns}
        searchColumns={[Columns[0], Columns[2]]}
        searchPlaceHolder="Tìm kiếm..."
        filters={[filterActive]}
        // addButton={{ link: "#" }}
        actions={[
          {
            icon: (
              <span className="text-main" title="Duyệt">
                <FaCheck size={24} />
              </span>
            ),
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
        // extraElementsToolBar={selectMonth}
      />
      {classData ? (
        <div className="flex w-full justify-center items-center">
          <p>{classData.length <= 0 ? "Không có dữ liệu" : null}</p>
        </div>
      ) : (
        <span className="w-full flex items-center justify-center">
          Đang tải...
        </span>
      )}
    </>
  );
};

export default BurnOutPage;
