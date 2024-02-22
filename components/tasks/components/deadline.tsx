import React from 'react'
import { useState, useEffect } from 'react';




export default function Deadline(deadline: any) {
    const [remainingTime, setRemainingTime] = React.useState(0);

    useEffect(() => {

        // Calculate initial countdown
        const timestamp = Date.parse(deadline);
        const targetDate = new Date(timestamp);
        const initialRemainingTime = targetDate.getTime() - Date.now();
        setRemainingTime(initialRemainingTime);
        console.log('initialRemainingTime', initialRemainingTime);
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            const updatedRemainingTime = targetDate.getTime() - Date.now();
            setRemainingTime(updatedRemainingTime);
        }, 1000);

        return () => {
            clearInterval(countdownInterval); // Clean up interval
        };

    }, [deadline]);

    const remainingSeconds = Math.floor(remainingTime / 1000);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingDays = Math.floor(remainingHours / 24);

    return (
        <span className='text-md text-slate-600 px-2'> Due in: {remainingDays}d, {remainingHours % 24}h, {remainingMinutes % 60}m, {remainingSeconds % 60}s </span>

    )
}