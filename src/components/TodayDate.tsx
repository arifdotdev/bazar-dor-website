'use client'
import { useSyncExternalStore } from "react";

const weekdayFormatter = new Intl.DateTimeFormat("bn-BD", { weekday: "long", timeZone: "Asia/Dhaka" });
const dateFormatter = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
});

const subscribe = () => () => {};
const getNow = () => Math.floor(Date.now() / 60_000);
const getServerNow = () => null;

interface TodayDateProps {
    className?: string;
    weekdayClassName?: string;
}

const TodayDate = ({ className = "", weekdayClassName = "" }: TodayDateProps) => {
    const minute = useSyncExternalStore(subscribe, getNow, getServerNow);

    if (minute === null) {
        return <span aria-hidden className={`invisible ${className}`}>&nbsp;</span>;
    }

    const now = new Date(minute * 60_000);

    return (
        <time className={className}>
            <span className={weekdayClassName}>{weekdayFormatter.format(now)}, </span>
            {dateFormatter.format(now)}
        </time>
    );
};

export default TodayDate;
