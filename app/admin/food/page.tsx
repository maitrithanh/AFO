"use client";

import PutFoodDialog from "@/app/components/food/putFoodDialog";
import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import FoodRes from "@/types/FoodRes";
import useFetch from "@/utils/useFetch";
import { useState } from "react";

const Columns: TableTemplateColumn<FoodRes>[] = [
  {
    title: "TÊN MÓN ĂN",
    getData: (x) => x.name,
  },
  {
    title: "MÔ TẢ",
    getData: (x) => <div className="md:max-w-[500px]">{x.desc}</div>,
  },
];

const FoodPage = () => {
  const [edit, setEdit] = useState(false);
  const [curr, setCurr] = useState<FoodRes | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onAdd = () => {
    setOpenDialog(true);
  };

  const onEdit = (obj: FoodRes) => {
    setOpenDialog(true);
    setEdit(true);
    setCurr(obj);
  };

  const onClose = () => {
    setOpenDialog(false);
    setEdit(false);
    setCurr(undefined);
  };

  const { data: MenuData } = useFetch(`/Menu/ListFood`, refresh);

  return (
    <div>
      <TableTemplate<FoodRes>
        title="Danh sách món ăn"
        dataSource={MenuData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Nhập tên món ăn"
        addButton={{ onClick: onAdd }}
        actions={[{ onClick: onEdit }]}
      />

      {openDialog && (
        <PutFoodDialog
          onClose={onClose}
          editMode={edit}
          current={curr}
          onRefresh={() => setRefresh((x) => !x)}
        />
      )}
    </div>
  );
};

export default FoodPage;
