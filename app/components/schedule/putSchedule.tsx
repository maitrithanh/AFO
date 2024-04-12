"use client";

import ScheduleDetail from "@/types/ScheduleDetail";
import ScheduleTable from "./scheduleTable";
import { useState } from "react";
import moment from "moment";
import { menu } from "@/data/menu";
import { FaCheck } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { callApiWithToken } from "@/utils/callApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AddItem from "../admin/menu/addItem";
import useFetch from "@/utils/useFetch";
import ClassRoom from "@/types/ClassRoom";

interface Props {
  curr: ScheduleDetail;
  edit: boolean;
}

const PutSchedulePage = ({ curr, edit }: Props) => {
  const [weekStart, setWeekStart] = useState(
    curr.start || moment().format("YYYY") + "-W" + moment().format("WW")
  );
  const [weekEnd, setWeekEnd] = useState(
    curr.end || moment().format("YYYY") + "-W" + moment().format("WW")
  );

  const [name, setName] = useState(curr.name);
  const [desc, setDesc] = useState(curr.desc);
  const [editName, setEditName] = useState(!edit);
  const [editDesc, setEditDesc] = useState(!edit);
  const [items, setItems] = useState<ScheduleDetail>({ ...curr });
  const [selectClass, setSelectClass] = useState<ClassRoom[]>(
    curr.classes ?? []
  );

  const { data: classes } = useFetch<ClassRoom[]>(
    "classRoom/List/" + new Date().getFullYear().toString()
  );

  const router = useRouter();

  const onAddClass = (c: ClassRoom) => {
    setSelectClass((x) => [...x, c]);
  };

  const onRemoveClass = (c: ClassRoom) => {
    setSelectClass((x) => x.filter((y) => y.id != c.id));
  };

  const onSubmit = () => {
    const obj = {
      schedule: {
        name,
        desc,
        start: weekStart,
        end: weekEnd,
      },
      items: items.items,
      classes: selectClass.map((x) => x.id),
    };

    if (edit) {
      callApiWithToken()
        .put("Schedule/update/" + curr.id, obj)
        .then(() => {
          toast.success("Lưu Thành công");
          router.push("/admin/schedule/");
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra");
        });
    } else {
      //add
      callApiWithToken()
        .post("Schedule/Add", obj)
        .then(() => {
          toast.success("Lưu thành công");
          router.push("/admin/schedule/");
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra");
        });
    }
  };

  return (
    <div>
      <div className="w-full mb-5 px-5">
        <h2 className="text-3xl mb-3">
          {edit ? "Chỉnh sửa " : "Thêm "} Thời khóa biểu
        </h2>

        {/* name */}
        <div className="flex group items-baseline mb-3">
          <span className="mr-2 italic"> Tên thời khóa biểu:</span>
          {editName ? (
            <input
              type="text"
              value={name}
              placeholder="Tên thời khóa biểu"
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              className="outline-main border-main bg-gray-100 p-2 text-2xl w-fit rounded-md"
            />
          ) : (
            <div>
              <h2 className="text-2xl p-2">{name}</h2>
            </div>
          )}
          <button
            title="Sửa tên thời khóa biểu"
            className={`${
              editName ? "text-green-600" : "invisible"
            } ml-2 group-hover:visible`}
            onClick={() => setEditName((curr) => !curr)}
          >
            {editName ? <FaCheck size={20} /> : <MdModeEditOutline size={20} />}
          </button>
        </div>

        {/* desc */}
        <div className="group pr-2 w-full flex items-center">
          <span className="mr-2 whitespace-nowrap italic"> Mô tả:</span>
          {editDesc ? (
            <textarea
              value={desc}
              placeholder="Mô tả"
              onChange={(e) => {
                setDesc(e.currentTarget.value);
              }}
              className="outline-main border-main bg-gray-100 p-2 flex-1 rounded-md"
            />
          ) : (
            <div>
              <h2 className="text-2xl p-2">{desc}</h2>
            </div>
          )}
          <button
            title="Sửa tên menu"
            className={`${
              editDesc ? "text-green-600" : "invisible"
            } ml-2 group-hover:visible`}
            onClick={() => setEditDesc((curr) => !curr)}
          >
            {editDesc ? <FaCheck size={20} /> : <MdModeEditOutline size={20} />}
          </button>
        </div>
      </div>

      {/* items */}
      <div className="px-5 w-full m-auto">
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default h-full">
          {items && <ScheduleTable dataSrc={items} setData={setItems} edit />}
        </div>
      </div>

      <div className="p-4 flex items-end">
        <div>
          {/* weeks */}
          <div className="mb-3">
            <label htmlFor="" className="mr-2">
              Áp dụng từ tuần:
            </label>
            <input
              type="week"
              value={weekStart}
              className="bg-gray-100 p-2 focus:border-main focus:outline-main rounded-md"
              onChange={(e) => {
                setWeekStart(e.currentTarget.value);
              }}
              placeholder="Chọn tuần"
            />
            <span className="mx-2"> đến tuần:</span>
            <input
              type="week"
              value={weekEnd}
              className="bg-gray-100 p-2 focus:border-main focus:outline-main rounded-md"
              onChange={(e) => {
                setWeekEnd(e.currentTarget.value);
              }}
              placeholder="Chọn tuần"
            />
          </div>

          {/* add class */}
          <div className="flex items-center mb-4">
            <span className="mr-3">Chọn các lớp áp dụng thời khóa biểu: </span>
            <AddItem<ClassRoom>
              onAdd={onAddClass}
              dataSource={classes || []}
              getName={(x) => x.name}
              getKey={(x) => x.id + ""}
              visible
              placeholder="Thêm lớp"
            />
          </div>

          {/* chosen classes */}
          <div>
            {selectClass.map((x) => (
              <span
                key={x.name}
                className="py-1 px-2 mr-3 mb-1 border-gray-300 text-gray-500 border-solid border-2 rounded-xl"
              >
                <span className="mr-2">{x.name}</span>
                <span
                  className="text-black text-xl cursor-pointer"
                  onClick={() => onRemoveClass(x)}
                >
                  x
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1"></div>
        <div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-3 rounded mx-4 text-xl"
            onClick={onSubmit}
          >
            {edit ? "Cập nhật" : "Thêm"}
          </button>

          {/* {edit && (
                    <button
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                        onClick={onDelete}
                    >
                        Xóa
                    </button>
                )} */}
        </div>
      </div>

      {/* classes */}
    </div>
  );
};

export default PutSchedulePage;
