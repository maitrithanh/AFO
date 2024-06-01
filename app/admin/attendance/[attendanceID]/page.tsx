"use client";

import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BackAction from "@/app/components/admin/BackAction";
import { useSearchParams } from "next/navigation";
import DefaultImage from "@/app/components/shared/defaultImage";
import { getImageUrl } from "@/utils/image";
import { searchAtt } from "@/utils/handleAPI";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { formatDate } from "@/utils/formatDate/formatDate";

const Columns: TableTemplateColumn[] = [
  {
    title: "Mã trẻ",
    getData: (x) => x.childId,
  },
  {
    title: "Hình",
    getData: (x) => (
      <DefaultImage img={getImageUrl(x.avatar)} fallback="/avatar.webp" />
    ),
  },
  {
    title: "Họ Tên",
    getData: (x) => x.childName,
  },
  {
    title: "Vào lớp",
    getData: (x) => (
      <input
        type="checkbox"
        defaultChecked={x.started}
        className="scale-150 cursor-not-allowed"
        readOnly
      />
    ),
  },
  {
    title: "Ra về",
    getData: (x) => (
      <input
        type="checkbox"
        defaultChecked={x.ended}
        className="scale-150 cursor-not-allowed"
        readOnly
      />
    ),
  },
  {
    title: "Nghỉ phép",
    getData: (x) => x.reason,
  },
  {
    title: "Điểm",
    getData: (x) => <p className="font-bold text-main">{x.point}</p>,
  },
  {
    title: "Ghi chú",
    getData: (x) => x.note,
  },
];

const DetailAttendancePage = ({ params }: any) => {
  const [dataSearch, setDataSearch] = useState<any[]>([]);

  const { data: attendanceByID } = useFetch(
    `CheckIn/getListById?id=${params?.attendanceID}`
  );

  const searchParams = useSearchParams();

  const { data: attendanceData } = useFetch(
    `CheckIn/getByDate?date=${searchParams.get("date")}`
  );

  const detailAttendance = attendanceData?.find(
    (x: any) => x.id == params?.attendanceID
  );

  useEffect(() => {
    searchAtt(params?.attendanceID, setDataSearch);
  }, [params]);

  return (
    <>
      <BackAction />

      <TableTemplate
        title={`Lớp ${detailAttendance?.classOfDay}`}
        dataSource={attendanceByID || []}
        columns={Columns}
        searchColumns={[Columns[1]]}
        searchPlaceHolder="Nhập tên trẻ..."
        //   actions={[{ getLink: (x) => `/admin/attendance/${x.id}` }]}
      />

      <div className="bg-white shadow-3xl text-lg p-4 rounded-md">
        <h5>Lịch sử điểm danh</h5>
        <Accordion type="single" collapsible>
          {dataSearch?.map((item, i) => {
            return (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-slate-50 p-2 rounded-lg my-2 "
              >
                <AccordionTrigger className="text-lg">
                  {new Date(item.createdAt).toUTCString()}
                </AccordionTrigger>
                <AccordionContent>
                  {item.history.map((h: any, i: any) => {
                    return (
                      <li key={i} className="grid grid-cols-4 text-lg">
                        <span>
                          <strong>Họ Tên: </strong>
                          {attendanceByID[i].childName}
                        </span>
                        <span className="flex gap-2">
                          <strong>Vào lớp: </strong>{" "}
                          {h.Started ? (
                            <span className="text-green-600">
                              <MdCheckCircle size={24} />
                            </span>
                          ) : (
                            <span className="text-rose-600">
                              <MdOutlineRadioButtonUnchecked size={24} />
                            </span>
                          )}
                        </span>
                        <span className="flex gap-2">
                          <strong>Ra về: </strong>{" "}
                          {h.Ended ? (
                            <span className="text-green-600">
                              <MdCheckCircle size={24} />
                            </span>
                          ) : (
                            <span className="text-rose-600">
                              <MdOutlineRadioButtonUnchecked size={24} />
                            </span>
                          )}
                        </span>
                        <span>
                          <strong>Điểm: </strong> {h.Point}
                        </span>
                      </li>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default DetailAttendancePage;
