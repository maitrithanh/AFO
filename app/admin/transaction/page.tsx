"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import TransactionModel from "@/types/Transaction";
import { toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";


const Columns: TableTemplateColumn<TransactionModel>[] = [
    {
        title: 'MÃ GIAO DỊCH',
        getData: (x) => x.transactionID
    },
    {
        title: 'SỐ TÀI KHOẢN',
        getData: (x) => x.srcAccount
    },
    {
        title: 'NỘI DUNG',
        getData: (x) => <div className="md:max-w-[500px]">
            {x.content}
        </div>
    },
    {
        title: 'SỐ TIỀN',
        getData: (x) => x.amount.toLocaleString('en')
    },
    {
        title: 'THỜI GIAN',
        getData: (x) => x.time
    },
    {
        title: 'SỐ NHẬN DẠNG',
        getData: (x) => x.refNumber
    },
]

const TransactionPage = () => {
    const { data } = useFetch(`Tuition/GetTransactions`);

    return <TableTemplate<TransactionModel>
        title="Lịch sử nhận chuyển khoản"
        dataSource={data || []}
        columns={Columns}
        searchColumns={[Columns[1], Columns[2]]}
        searchPlaceHolder="Nhập số tài khoản hoặc nội dung"
        dateRange={{
            name: 'Ngày chuyển: ',
            filter: (obj, from, to) => (from == '' || toYMD(obj.time) >= from) && (to == '' || toYMD(obj.time) <= to)
        }}
    />
}

export default TransactionPage