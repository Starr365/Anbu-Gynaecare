'use client';

import React, { useState } from 'react';
import { Droplet, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCycleLogs, useCyclePredictions } from '@/hooks/useCycle';
import { formatPredictionDate } from '@/services/predictions';
import BottomNavigation from './BottomNavigation';
import { motion, AnimatePresence } from 'framer-motion';

const Track = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [direction, setDirection] = useState(0);
  
  // Fetch cycle data
  const { logs, logsLoading, error: logsError, createLog } = useCycleLogs();
  const { prediction, daysUntil, loading: predictionsLoading, error: predictionsError } = useCyclePredictions();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setDirection(1);
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
    
    // Check if day has a log entry
    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasLog = logs.some(log => {
      const logDateStr = log.date || log.createdAt;
      const logDate = new Date(logDateStr).toISOString().split('T')[0];
      return logDate === dayString;
    });
    
    if (hasLog) {
      classes += 'bg-red-100 text-red-600 ';
    }
    
    // Fertile days (estimated based on cycle)
    if (prediction && daysUntil) {
      const fertileStartDay = daysUntil - 5;
      const fertileEndDay = daysUntil + 5;
      const daysFromNow = Math.floor((new Date(year, month, day).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysFromNow >= fertileStartDay && daysFromNow <= fertileEndDay) {
        classes += 'bg-green-100 text-green-600 ';
      }
    }
    return classes.trim();
  };

  const getDayEmoji = (day: number) => {
    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasLog = logs.some(log => {
      const logDateStr = log.date || log.createdAt;
      const logDate = new Date(logDateStr).toISOString().split('T')[0];
      return logDate === dayString;
    });
    if (hasLog) return '🩸';
    
    if (prediction && daysUntil) {
      const fertileStartDay = daysUntil - 5;
      const fertileEndDay = daysUntil + 5;
      const daysFromNow = Math.floor((new Date(year, month, day).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysFromNow >= fertileStartDay && daysFromNow <= fertileEndDay) return '🌸';
    }
    return '';
  };

  const calendarVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const calendarDays = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasLog = logs.some(log => {
      const logDateStr = log.date || log.createdAt;
      const logDate = new Date(logDateStr).toISOString().split('T')[0];
      return logDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    });
    calendarDays.push(
      <motion.div
        key={day}
        className={getDayClass(day)}
        variants={dayVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: hasLog ? 0.1 : 0 }}
      >
        {day}
        {getDayEmoji(day) && (
          <motion.span
            className="absolute -top-1 -right-1 text-xs"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
          >
            {getDayEmoji(day)}
          </motion.span>
        )}
      </motion.div>
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
            <motion.button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-muted"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.h2
              className="font-headline text-xl font-semibold"
              key={`${month}-${year}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {monthNames[month]} {year}
            </motion.h2>
            <motion.button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-muted"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${year}-${month}`}
              custom={direction}
              variants={calendarVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-7 gap-2"
            >
              {calendarDays}
            </motion.div>
          </AnimatePresence>
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
          <motion.button
            onClick={() => {
              setSelectedDate(new Date().toISOString().split('T')[0]);
              setShowLogModal(true);
            }}
            className="w-full mt-6 bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft disabled:opacity-50"
            disabled={logsLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {logsLoading ? 'Loading...' : 'Log Today&apos;s Details'}
          </motion.button>
          {logsError && <p className="text-accent text-sm mt-2">{logsError}</p>}
        </div>
      </section>

      {/* Predictions */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {predictionsLoading ? (
            <div className="bg-blush rounded-2xl p-4 shadow-soft">
              <div className="h-6 bg-muted/20 rounded w-3/4"></div>
            </div>
          ) : predictionsError ? (
            <div className="bg-blush rounded-2xl p-4 shadow-soft">
              <p className="text-accent text-sm">{predictionsError}</p>
            </div>
          ) : prediction ? (
            <>
              <div className="bg-blush rounded-2xl p-4 shadow-soft">
                <h3 className="font-headline text-lg font-semibold">
                  Next Period: {prediction.predictedDate ? formatPredictionDate(prediction.predictedDate) : 'N/A'} 
                  {daysUntil && <span className="text-accent"> ({daysUntil} days)</span>}
                </h3>
              </div>
              {prediction.cycle_length && (
                <div className="bg-mint rounded-2xl p-4 shadow-soft">
                  <h3 className="font-headline text-lg font-semibold">Cycle Length: {prediction.cycle_length} days</h3>
                </div>
              )}
              {prediction.period_length && (
                <div className="bg-lavender rounded-2xl p-4 shadow-soft">
                  <h3 className="font-headline text-lg font-semibold">Period Length: {prediction.period_length} days</h3>
                </div>
              )}
              {prediction.confidence && (
                <div className="bg-sand rounded-2xl p-4 shadow-soft">
                  <h3 className="font-headline text-lg font-semibold">Confidence: {prediction.confidence}%</h3>
                </div>
              )}
            </>
          ) : (
            <div className="bg-blush rounded-2xl p-4 shadow-soft">
              <p className="font-body text-muted">Complete your cycle setup to see predictions</p>
            </div>
          )}
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
            💡 {logs.length > 0 ? 'Great job logging your cycle! Keep it up for better predictions.' : 'Start logging your cycle to get personalized tips and predictions.'}
          </p>
        </div>
      </section>

      {/* Log Modal */}
      <AnimatePresence>
        {showLogModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-bg rounded-2xl p-6 max-w-sm w-full max-h-96 overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            >
            <h2 className="font-headline text-xl font-semibold mb-4">Log Your Period</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium text-text mb-2">
                  Flow Intensity
                </label>
                <select 
                  id="flow"
                  className="w-full px-4 py-2 rounded-xl border border-muted bg-bg"
                  defaultValue="light"
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-text mb-2">
                  How are you feeling?
                </label>
                <select 
                  id="feeling"
                  className="w-full px-4 py-2 rounded-xl border border-muted bg-bg"
                  defaultValue="moody"
                >
                  <option value="moody">Moody</option>
                  <option value="tired">Tired</option>
                  <option value="irritable">Irritable</option>
                  <option value="stressed">Stressed</option>
                  <option value="energetic">Energetic</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-text mb-2">
                  Symptoms
                </label>
                <div className="space-y-2">
                  {['cramps', 'bloating', 'headache', 'fatigue', 'nausea'].map(symptom => (
                    <label key={symptom} className="flex items-center">
                      <input 
                        type="checkbox" 
                        value={symptom}
                        className="mr-2"
                        id={`symptom-${symptom}`}
                      />
                      <span className="font-body text-sm capitalize">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 bg-muted text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const flow = (document.getElementById('flow') as HTMLSelectElement)?.value;
                  const feeling = (document.getElementById('feeling') as HTMLSelectElement)?.value;
                  const symptoms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(el => (el as HTMLInputElement).value);
                  
                  await createLog({
                    period_flow: flow as 'none' | 'light' | 'medium' | 'heavy',
                    feeling: feeling as 'moody' | 'tired' | 'irritable' | 'stressed' | 'energetic',
                    symptoms,
                  });
                  setShowLogModal(false);
                }}
                className="flex-1 bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
              >
                Save Log
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

export default Track;