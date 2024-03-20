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
import { error } from "console";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã yêu cầu",
    getData: (x) => x.reqId,
  },
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
    ),
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

const BurnOutPage = (params: any) => {
  const searchParams = useSearchParams();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [refresh, setRefresh] = useState(false);

  const { data: classData } = useFetch(
    `CheckIn/getRequest?classId=${params.params.burnoutID}&month=${month}`,
    refresh
  );

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
        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  return (
    <>
      <BackAction />
      <TableTemplate
        title={`Danh sách xin nghỉ lớp ${searchParams.get("class")}`}
        dataSource={classData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Tìm kiếm..."
        // addButton={{ link: "#" }}
        actions={[
          {
            icon: <FaCheck size={24} />,
            onClick: (x) => {
              if (!x.isActive) {
                hanldeAccept(x.reqId);
              }
            },
          },
        ]}
        extraElementsToolBar={selectMonth}
      />
    </>
  );
};

export default BurnOutPage;
