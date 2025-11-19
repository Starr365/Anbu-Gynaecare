'use client';

import React, { useState } from 'react';
import { Droplet, ChevronLeft, ChevronRight } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const Track = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getDayClass = (day: number) => {
    let classes = 'h-10 flex items-center justify-center rounded-lg text-sm font-body relative ';
    if (day === today && month === currentMonth && year === currentYear) {
      classes += 'ring-2 ring-accent ';
    }
    // Simulate period days (e.g., days 12-16)
    if (day >= 12 && day <= 16) {
      classes += 'bg-red-100 text-red-600 ';
    }
    // Fertile days (e.g., days 14-18)
    if (day >= 14 && day <= 18) {
      classes += 'bg-green-100 text-green-600 ';
    }
    return classes.trim();
  };

  const getDayEmoji = (day: number) => {
    if (day >= 12 && day <= 16) return '🩸';
    if (day >= 14 && day <= 18) return '🌸';
    return '';
  };

  const calendarDays = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div key={day} className={getDayClass(day)}>
        {day}
        {getDayEmoji(day) && (
          <span className="absolute -top-1 -right-1 text-xs">{getDayEmoji(day)}</span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <section className="bg-linear-to-r from-rose to-blush text-text px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-headline text-2xl font-semibold mb-2">
            Track Your Cycle
          </h1>
          <p className="font-body text-lg">
            Log your period, moods, and symptoms
          </p>
        </div>
      </section>

      {/* Monthly Calendar */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-muted">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-headline text-xl font-semibold">{monthNames[month]} {year}</h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-muted">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4 text-center font-body text-sm text-muted">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays}
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-xs font-body">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-100 rounded-full mr-1"></span>
              Period
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-100 rounded-full mr-1"></span>
              Fertile
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 ring-2 ring-accent rounded-full mr-1"></span>
              Today
            </div>
          </div>
          <button className="w-full mt-6 bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Log Today&apos;s Details
          </button>
        </div>
      </section>

      {/* Predictions */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-blush rounded-2xl p-4 shadow-soft">
            <h3 className="font-headline text-lg font-semibold mb-2">Next Period: Nov 23 (5 days)</h3>
          </div>
          <div className="bg-mint rounded-2xl p-4 shadow-soft">
            <h3 className="font-headline text-lg font-semibold mb-2">Cycle Length: 28 days</h3>
          </div>
          <div className="bg-lavender rounded-2xl p-4 shadow-soft">
            <h3 className="font-headline text-lg font-semibold mb-2">Period Length: 5 days</h3>
          </div>
        </div>
      </section>

      {/* Today's Tip */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-sand rounded-2xl p-6 shadow-soft">
          <div className="flex items-center mb-4">
            <Droplet className="w-6 h-6 text-accent mr-2" />
            <h2 className="font-headline text-lg font-semibold text-text">Today&apos;s Tip</h2>
          </div>
          <p className="font-body text-sm text-muted mb-4">
            💡 You&apos;re in your&apos; follicular phase.<br />
            Great time for trying new activities & socializing!
          </p>
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Track;