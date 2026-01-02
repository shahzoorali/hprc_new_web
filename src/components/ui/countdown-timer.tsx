"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const countdownItems = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Mins", value: timeRemaining.minutes },
    { label: "Secs", value: timeRemaining.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <p className="relative text-3xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            {item.value.toString().padStart(2, "0")}
          </p>
          <p className="relative text-xs font-semibold uppercase tracking-wider text-white/70">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
