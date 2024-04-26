"use client";

import DialogAddEvent from "@/app/components/admin/event/DialogAddEvent";
import TableTemplate, {
  FilterOptions,
  TableTemplateAction,
  TableTemplateColumn,
  TableTemplateFilter,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import { toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import { MdEditNote } from "react-icons/md";

const Columns: TableTemplateColumn[] = [
  {
    title: "tên sự kiện",
    getData: (x) => <div className="flex">{x.title}</div>,
  },
  {
    title: "Số ngày nghỉ",
    getData: (x) => (
      <div className="flex">
        <span className="font-bold mx-1 text-main">{x.countDay}</span> ngày
      </div>
    ),
  },
  {
    title: "thời gian",
    getData: (x) => `${x.startDate} - ${x.endDate}`,
  },
];

function getDayDiff(target: string) {
  var dateParts = target.split("/");
  var targetDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  const today = new Date();
  const diffInMs = targetDate.getTime() - today.getTime(); // Milliseconds difference
  const days = Math.round(diffInMs / (1000 * 60 * 60 * 24)); // Convert to days (rounded)

  return days;
}

const sorts: TableTemplateSort[] = [
  {
    title: "Sắp đến",
    compare: (a, b) => {
      var x = getDayDiff(a.startDate);
      var y = getDayDiff(b.startDate);

      if (x < 0 || y < 0) return y - x;
      return x - y;
    },
  },
  {
    title: "Mới nhất",
    compare: (a, b) => getDayDiff(b.startDate) - getDayDiff(a.startDate),
  },
  {
    title: "Cũ nhất",
    compare: (a, b) => getDayDiff(a.startDate) - getDayDiff(b.startDate),
  },
];

const searchs: TableTemplateColumn[] = [
  {
    title: "",
    getData: (x) => x.title,
  },
];

const filterOptions: FilterOptions[] = [
  {
    value: "Tất cả",
    filter: () => true,
  },
  {
    value: "Chưa diễn ra",
    filter: (x) => getDayDiff(x.startDate) > 0,
  },
  {
    value: "Đã diễn ra",
    filter: (x) => getDayDiff(x.startDate) < 0,
  },
];

const filter: TableTemplateFilter = {
  name: "Hiển thị",
  options: filterOptions,
};

const EventPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [closeDialogAddEvent, setCloseDialogAddEvent] = useState(false);
  const [getId, setGetId] = useState("");

  const year = new Date().getFullYear();
  const { data: eventData } = useFetch(
    `Events/getList?year=${year}`,
    closeDialogAddEvent
  );

  const onClose = () => {
    setCloseDialogAddEvent((curr) => !curr);
  };
  const currentEvents = eventData?.find((event: any) => event.id == getId);
  const clearObj = {
    title: "",
    start: "",
    end: "",
  };

  const dialog = (
    <div
      className={`${
        !closeDialogAddEvent ? "hidden opacity-0" : "block opacity-100"
      } transition-all`}
    >
      <DialogAddEvent
        onClose={onClose}
        editMode={editMode}
        currentEvents={editMode ? currentEvents : clearObj}
      />
    </div>
  );

  const handleOpenAdd = () => {
    setEditMode(false);
    onClose();
  };

  const handleEdit = (obj: any) => {
    setGetId(obj.id);
    setEditMode(true);
    onClose();
  };

  const Action: TableTemplateAction = {
    onClick: (x) => {
      handleEdit(x);
    },
    icon: (
      <span className="hover hover:text-main text-gray-500">
        <MdEditNote size={24} />
      </span>
    ),
  };

  return (
    <TableTemplate
      title="Lịch sự kiện"
      dataSource={eventData || []}
      columns={Columns}
      actions={[Action]}
      addButton={{ onClick: handleOpenAdd }}
      searchColumns={searchs}
      searchPlaceHolder="Nhập tên sự kiện"
      extraElementsToolBar={dialog}
      sortOptions={sorts}
      filters={[filter]}
      dateRange={{
        name: "Ngày: ",
        filter: (obj, from, to) =>
          (from == "" || toYMD(obj.endDate) >= from) &&
          (to == "" || toYMD(obj.startDate) <= to),
      }}
    />
  );
};

export default EventPage;
