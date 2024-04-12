"use client"; // dùng tạm //dùng luôn đi

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "@/utils/useFetch";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import PutSchedulePage from "@/app/components/schedule/putSchedule";

const ScheduleDetailPage = ({params}: any) => {
    const { t } = useTranslation();

    const id = params.id;
    const { data } = useFetch<ScheduleDetail>(
        "Schedule/ScheduleDetail/" + id,
        null,
        id
    );

    return <div>
        {data && <PutSchedulePage curr={data} edit={true} />}
    </div>;
};

export default ScheduleDetailPage;
