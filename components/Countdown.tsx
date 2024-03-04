'use client'
import { useEffect, useState } from "react";

interface CountdownProps {
  writerDeadline: string;
}

export default function Countdown({ writerDeadline }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let countdownInterval: any = null;

    // Calculate initial countdown
    const timestamp = Date.parse(writerDeadline);
    const targetDate = new Date(timestamp);
    const initialRemainingTime = targetDate.getTime() - Date.now();
    setRemainingTime(initialRemainingTime);

    // Update countdown every second
    countdownInterval = setInterval(() => {
      const updatedRemainingTime = targetDate.getTime() - Date.now();
      setRemainingTime(updatedRemainingTime);
    }, 1000);

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval); // Clean up interval
      }
    };
  }, [writerDeadline]);

  // Calculate remaining time in days, hours, minutes, and seconds
  const remainingSeconds = Math.floor(remainingTime / 1000);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingDays = Math.floor(remainingHours / 24);

  // Render remaining time or a loading state
  return (
    <span className='text-sm px-2'>
      Due in: {remainingDays} days, {remainingHours % 24} hrs, {remainingMinutes % 60} mins, {remainingSeconds % 60} secs
    </span>
  );
}
