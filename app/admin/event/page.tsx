"use client";

import DialogAddEvent from "@/app/components/admin/event/DialogAddEvent";
import TableTemplate, {
  TableTemplateAction,
  TableTemplateColumn,
  TableTemplateSort,
} from "@/app/components/shared/TableTemplate";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Columns: TableTemplateColumn[] = [
  {
    title: "sự kiện",
    getData: (x) => (
      <div className="flex">
        {x.title}
        <p className="bg-main w-5 h-5 flex items-center justify-center text-white rounded-full ml-2">
          {x.countDay}
        </p>
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

      //-1 -> ab
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
        <CiEdit size={24} />
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
      searchPlaceHolder="Tìm kiếm..."
      extraElementsToolBar={dialog}
      sortOptions={sorts}
    />
  );
};

export default EventPage;
