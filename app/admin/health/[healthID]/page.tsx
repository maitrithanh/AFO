"use client";
import DetailHealthTable from "@/app/components/admin/health/DetailHealthTable";
import useFetch from "@/utils/useFetch";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BackAction from "@/app/components/admin/BackAction";

const DetailHealthPage = (param: any) => {
  const { data: allEventHealth } = useFetch("Healthy/getListEvent");
  // Lấy thông tin eventHealth hiện tại
  const currentEventHealth = allEventHealth?.find(
    (allEH: any) => allEH.id == param?.params?.healthID
  );
  //lấy năm
  const dateByEvent = currentEventHealth?.examDate;
  const yearByEvent = dateByEvent?.substr(dateByEvent.length - 4);

  const { data: allClass } = useFetch(`ClassRoom/List/${yearByEvent}`);
  const [classChoose, setClassChoose] = useState("0");
  // Lấy thông lớp đang được chọn
  const currentClass = allClass?.find((allC: any) => allC.id == classChoose);

  useEffect(() => {
    if (allClass) setClassChoose(allClass[0].id);
  }, [allClass]);

  return (
    <>
      <div>
        <BackAction />
      </div>
      <div className="px-4">
        <div className="text-xl flex justify-between items-center">
          <div className="flex items-center">
            Sức khoẻ lớp
            <div className="bg-white rounded-md">
              {allClass ? (
                <Select
                  onValueChange={(value) => {
                    setClassChoose(value);
                  }}
                >
                  <SelectTrigger className="w-[110px] text-md">
                    <SelectValue
                      placeholder={allClass[0].name}
                      defaultValue={allClass[0].id}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {allClass?.map((item: any) => {
                      return (
                        <SelectItem
                          key={item?.id}
                          value={item?.id}
                          className="text-md"
                        >
                          {item?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : (
                ""
              )}
            </div>
            Ngày {currentEventHealth?.examDate}
          </div>
          <div>
            <p className="text-lg">
              Giáo viên phụ trách:
              <span className="italic">{currentClass?.teachers}</span>
            </p>
          </div>
        </div>

        <p className="text-lg">Số lượng: {currentClass?.count}</p>
      </div>
      <DetailHealthTable
        eventId={param?.params?.healthID}
        classId={classChoose}
      />
    </>
  );
};

export default DetailHealthPage;
