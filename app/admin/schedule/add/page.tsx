"use client"; // dùng tạm //dùng luôn đi

import React, { useMemo, useState } from "react";
import ScheduleDetail, { ScheduleItem } from "@/types/ScheduleDetail";
import PutSchedulePage from "@/app/components/schedule/putSchedule";

const AddSchedulePage = () => {
    const defaultData: ScheduleDetail = {
        name: '',
        desc: '',
        start: '',
        end: '',
        items: [],
        classes: []
    };

    return <PutSchedulePage curr={defaultData} edit={false} />;
};

export default AddSchedulePage;
