"use client"

import PutActivityDialog from "@/app/components/activity/putDialog";
import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import Activity from "@/types/Activity";
import useFetch from "@/utils/useFetch";
import { useState } from "react";

const Columns: TableTemplateColumn<Activity>[] = [
    {
        title: 'TÊN HOẠT ĐỘNG',
        getData: (x) => x.name
    },
    {
        title: 'MÔ TẢ',
        getData: (x) => <div className="md:max-w-[500px]">
            {x.desc}
        </div>
    },
    {
        title: 'THỜI GIAN (phút)',
        getData: (x) => x.time + ''
    },
]

const ActivityPage = () => {
    const [edit, setEdit] = useState(false);
    const [curr, setCurr] = useState<Activity | undefined>();
    const [openDialog, setOpenDialog] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { data: MenuData } = useFetch(`/Schedule/ListActivities`, refresh);

    const onAdd = () => { 
        setOpenDialog(true);
    }

    const onEdit = (obj: Activity) => { 
        setOpenDialog(true);
        setEdit(true);
        setCurr(obj);
    }

    const onClose = () => { 
        setOpenDialog(false);
        setEdit(false);
        setCurr(undefined);
    }

    return <div>
        <TableTemplate<Activity>
            title="Danh sách môn học / hoạt động"
            dataSource={MenuData || []}
            columns={Columns}
            searchColumns={[Columns[0]]}
            searchPlaceHolder="Nhập tên hoạt động"
            addButton={{ onClick: onAdd }}
            actions={[{ onClick: onEdit }]}
        />

        {
            openDialog &&
            <PutActivityDialog onClose={onClose} editMode={edit} current={curr} onRefresh={()=> setRefresh(x => !x)}/>
        }
    </div>
}

export default ActivityPage