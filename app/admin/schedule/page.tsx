"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import ScheduleList from "@/types/ScheduleList";
import { getWeekName } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";

const columns: TableTemplateColumn<ScheduleList>[] = [
    {
        title: 'Tên thời khóa biểu',
        getData: (x) => x.name
    },
    {
        title: 'Thời gian áp dụng',
        getData: (x) => <>
            {getWeekName(x.start)} đến{" "}
            {getWeekName(x.end)}
        </>
    },
    {
        title: 'Mô tả',
        getData: (x) => x.desc
    }
]

const SchedulePage = () => { 
    const { data: scheduleData } = useFetch<ScheduleList[]>(`/schedule/list`);

    return <TableTemplate<ScheduleList>
        title="Thời khóa biểu"
        dataSource={scheduleData || []}
        columns={columns}
        searchColumns={[columns[0]]}
        searchPlaceHolder="Nhập tên thời khóa biểu"
        addButton={{ link: '/admin/schedule/add' }}
        actions={[{ getLink: (x) => `/admin/schedule/${x.id}` }]}
    />
}

export default SchedulePage