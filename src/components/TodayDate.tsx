'use client'
import { useSyncExternalStore } from "react";

// Bangladesh time, whatever the viewer's time zone
const weekdayFormatter = new Intl.DateTimeFormat("bn-BD", { weekday: "long", timeZone: "Asia/Dhaka" });
const dateFormatter = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
});

const subscribe = () => () => {};
const getNow = () => Math.floor(Date.now() / 60_000); // minute precision keeps the snapshot stable
const getServerNow = () => null;

interface TodayDateProps {
    className?: string;
    // e.g. "hidden min-[400px]:inline" to drop the weekday where space is tight
    weekdayClassName?: string;
}

// "মঙ্গলবার, ৬ অক্টোবর, ২০২৬". Pages are cached (ISR), so a server-rendered date would go
// stale after midnight — render it in the browser; until then keep the line's space so nothing shifts
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
