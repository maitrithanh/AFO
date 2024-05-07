"use client"

import TableTemplate, { TableTemplateColumn } from "@/app/components/shared/TableTemplate"
import TransactionModel from "@/types/Transaction";
import { toYMD } from "@/utils/dateTime";
import useFetch from "@/utils/useFetch";
import { useState } from "react";
import UpdateTransactionDialog from "./updateDialog";


const getStatus = (x: TransactionModel) => { 
    return x.complete ?
        'Đã xử lý' :
        x.valid ? 'Hợp lệ' :
            'Không hợp lệ'
}

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
        title: 'TRẠNG THÁI',
        getData: (x) => <span className={`${
            x.complete ?
                'text-blue-500' :
                x.valid ? 'text-green-500' :
                    'text-red-500'
        }`}>
            {getStatus(x)}
        </span>
    },
]

const TransactionPage = () => {
    const [curr, setCurr] = useState<TransactionModel>();
    const [refresh, setRefresh] = useState(false);

    const { data } = useFetch(`Tuition/GetTransactions`, refresh);

    return <>
        <TableTemplate<TransactionModel>
            title="Lịch sử nhận chuyển khoản"
            dataSource={data || []}
            columns={Columns}
            searchColumns={[Columns[1], Columns[2]]}
            searchPlaceHolder="Nhập số tài khoản hoặc nội dung"
            dateRange={{
                name: 'Ngày chuyển: ',
                filter: (obj, from, to) => (from == '' || toYMD(obj.time) >= from) && (to == '' || toYMD(obj.time) <= to)
            }}
            filters={[
                {
                    name: 'Trạng thái',
                    options: [],
                    autoFilter: (x) => getStatus(x)
                }
            ]}
            actions={[
                {
                    onClick: (x) => { setCurr(x) }
                }
            ]}
        />

        {
            curr &&
            <UpdateTransactionDialog
                current={curr}
                onClose={() => { setCurr(undefined) }}
                onRefresh={() => setRefresh(x => !x)}
                editMode={!curr.valid && !curr.complete}
            />
        }
    </>
  
}

export default TransactionPage