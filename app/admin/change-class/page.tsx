"use client";

import TableTemplate, {
  FilterOptions,
  TableTemplateColumn,
  TableTemplateFilter,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
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
    title: "Ngày",
    getData: (x) => x.date,
  },
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.childAvatar)} fallback="/avatar.webp" />
    ),
  },
  {
    title: "Họ tên",
    getData: (x) => x.childName,
  },
  {
    title: "Lớp cũ",
    getData: (x) => x.oldClassName,
  },
  {
    title: "Lớp mới",
    getData: (x) => x.newClassName,
  },
  {
    title: "Lý do",
    getData: (x) => x.content,
  },
  {
    title: "Trạng thái",
    getData: (x) =>
      x.active ? (
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
    filter: (obj) => obj.active == true,
  },
  {
    value: "Chưa duyệt",
    filter: (obj) => obj.active == false,
  },
];

const filterActive: TableTemplateFilter = {
  name: "Trạng thái",
  options: activeOptions,
};

const ChangeClassPage = () => {
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

  const { data: classData } = useFetch(`ChangeClass/getRequest`, refresh);
  const { data: childData } = useFetch(`Child/getChild?id=${childID}`);

  console.log(childID);

  const hanldeAccept = (idReq: string) => {
    if (
      classData?.find((x: any) => {
        return x.reqId == idReq;
      }).active == true
    ) {
      toast("Đã được duyệt!");
    } else {
      if (childID != "") {
        callApiWithToken()
          .put(`ChangeClass/acceptRequest?reqID=${idReq}`)
          .then((response) => {
            handlRefresh();
            toast.success("Đã duyệt");
            handleSendNotiChangeClass(idReq);
          })
          .catch((error) => {
            toast.error("Có lỗi xảy ra!");
          });
      } else {
        toast("Vui lòng thử lại!");
      }
    }
  };

  const handleSendNotiChangeClass = (idReq: string) => {
    callApiWithToken()
      .post(
        `Notification/sendUser`,
        {
          PhoneNumber: childData?.parent?.phoneNumber,
          Title: "Đơn xin chuyển lớp đã được duyệt",
          Content: `Đơn xin chuyển lớp có mã:${idReq} đã được duyệt`,
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
  };

  const handleChangeClass = () => {
    callApiWithToken()
      .put(`ChangeClass/allChangeClass`)
      .then((res) => {
        if (res.data.data) {
          toast.error(res.data.data);
        } else {
          toast.success("Chuyển tất cả lớp thành công");
        }
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  const DefaultAddBtn = (
    <button
      className="bg-main hover:bg-mainBlur text-white font-bold py-2 px-4 rounded-full"
      onClick={() => {
        handleChangeClass();
      }}
    >
      Chuyển tất cả lớp
    </button>
  );

  return (
    <>
      <BackAction />
      <TableTemplate
        title={`Danh sách xin chuyển lớp`}
        dataSource={classData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Tìm kiếm..."
        addButton={{ button: DefaultAddBtn }}
        filters={[filterActive]}
        actions={[
          {
            icon: <FaCheck size={24} />,
            onClick: (x) => {
              if (!x.isActive) {
                setChildID(x.childID);
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
        "Đang tải"
      )}
    </>
  );
};

export default ChangeClassPage;
