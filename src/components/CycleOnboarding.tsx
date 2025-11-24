'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Clock, Droplet, Heart, AlertTriangle, Target, Coffee, CheckCircle } from 'lucide-react';

interface CycleOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CycleOnboarding: React.FC<CycleOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    lastPeriodDate: '',
    cycleLength: '',
    periodDuration: '',
    flowPattern: '',
    symptoms: [] as string[],
    irregularities: '',
    fertilityGoals: '',
    lifestyleFactors: [] as string[],
  });

  const steps = [
    {
      id: 0,
      title: 'Welcome to Cycle Tracking',
      content: (
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="font-headline text-2xl font-semibold mb-4">Let&apos;s Get Started!</h2>
          <p className="font-body text-lg mb-6">
            We&apos;ll ask you a few questions to personalize your cycle tracking experience.
            This will only take a few minutes.
          </p>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Last Period Date',
      icon: Calendar,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-2">
            When did your last period start?
          </label>
          <input
            type="date"
            value={answers.lastPeriodDate}
            onChange={(e) => setAnswers({ ...answers, lastPeriodDate: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>
      ),
    },
    {
      id: 2,
      title: 'Cycle Length',
      icon: Clock,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-2">
            How long is your typical cycle? (21-45 days)
          </label>
          <select
            value={answers.cycleLength}
            onChange={(e) => setAnswers({ ...answers, cycleLength: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select cycle length</option>
            {Array.from({ length: 25 }, (_, i) => i + 21).map(day => (
              <option key={day} value={day}>{day} days</option>
            ))}
          </select>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Period Duration',
      icon: Droplet,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-2">
            How many days does your period usually last? (3-8 days)
          </label>
          <select
            value={answers.periodDuration}
            onChange={(e) => setAnswers({ ...answers, periodDuration: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select duration</option>
            {[3, 4, 5, 6, 7, 8].map(day => (
              <option key={day} value={day}>{day} days</option>
            ))}
          </select>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Flow Pattern',
      icon: Droplet,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-4">
            Describe your typical flow pattern
          </label>
          <div className="space-y-3">
            {[
              { value: 'light', label: 'Light', desc: 'Minimal flow, mostly spotting' },
              { value: 'medium', label: 'Medium', desc: 'Moderate flow, regular changes' },
              { value: 'heavy', label: 'Heavy', desc: 'Heavy flow, frequent changes' },
              { value: 'variable', label: 'Variable', desc: 'Changes throughout period' },
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="flowPattern"
                  value={option.value}
                  checked={answers.flowPattern === option.value}
                  onChange={(e) => setAnswers({ ...answers, flowPattern: e.target.value })}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <div>
                  <div className="font-body font-medium">{option.label}</div>
                  <div className="font-body text-sm text-muted">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Common Symptoms',
      icon: Heart,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-4">
            Which symptoms do you commonly experience? (Select all that apply)
          </label>
          <div className="space-y-3">
            {[
              'Cramps', 'Headache', 'Fatigue', 'Mood swings', 'Bloating',
              'Back pain', 'Nausea', 'Breast tenderness', 'Acne', 'None'
            ].map(symptom => (
              <label key={symptom} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers.symptoms.includes(symptom)}
                  onChange={(e) => {
                    const newSymptoms = e.target.checked
                      ? [...answers.symptoms, symptom]
                      : answers.symptoms.filter(s => s !== symptom);
                    setAnswers({ ...answers, symptoms: newSymptoms });
                  }}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body">{symptom}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Irregularities',
      icon: AlertTriangle,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-4">
            Do you experience any irregularities or medical conditions?
          </label>
          <div className="space-y-3">
            {[
              { value: 'none', label: 'No irregularities' },
              { value: 'irregular', label: 'Irregular periods' },
              { value: 'pcos', label: 'PCOS' },
              { value: 'endometriosis', label: 'Endometriosis' },
              { value: 'fibroids', label: 'Fibroids' },
              { value: 'other', label: 'Other (please specify)' },
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="irregularities"
                  value={option.value}
                  checked={answers.irregularities === option.value}
                  onChange={(e) => setAnswers({ ...answers, irregularities: e.target.value })}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Fertility Goals',
      icon: Target,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-4">
            What are your fertility goals?
          </label>
          <div className="space-y-3">
            {[
              { value: 'avoid', label: 'Avoiding pregnancy' },
              { value: 'planning', label: 'Planning pregnancy' },
              { value: 'tracking', label: 'Just tracking my cycle' },
              { value: 'none', label: 'No specific goals' },
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="fertilityGoals"
                  value={option.value}
                  checked={answers.fertilityGoals === option.value}
                  onChange={(e) => setAnswers({ ...answers, fertilityGoals: e.target.value })}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Lifestyle Factors',
      icon: Coffee,
      content: (
        <div>
          <label className="block font-body text-sm font-medium text-muted mb-4">
            Which lifestyle factors affect your cycle? (Optional, select all that apply)
          </label>
          <div className="space-y-3">
            {[
              'Stress', 'Exercise', 'Diet changes', 'Travel', 'Sleep patterns',
              'Medications', 'Smoking', 'Alcohol', 'None'
            ].map(factor => (
              <label key={factor} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers.lifestyleFactors.includes(factor)}
                  onChange={(e) => {
                    const newFactors = e.target.checked
                      ? [...answers.lifestyleFactors, factor]
                      : answers.lifestyleFactors.filter(f => f !== factor);
                    setAnswers({ ...answers, lifestyleFactors: newFactors });
                  }}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body">{factor}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 9,
      title: 'Summary & Complete',
      icon: CheckCircle,
      content: (
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-headline text-2xl font-semibold mb-4">You&apos;re All Set!</h2>
          <p className="font-body text-lg mb-6">
            Thank you for sharing your information. We&apos;ll use this to provide personalized insights and predictions.
          </p>
          <div className="bg-mint rounded-2xl p-4 mb-6">
            <h3 className="font-headline text-lg font-semibold mb-2">Your Cycle Summary</h3>
            <p className="font-body text-sm text-muted">
              Cycle Length: {answers.cycleLength} days<br />
              Period Duration: {answers.periodDuration} days<br />
              Flow: {answers.flowPattern}<br />
              Symptoms: {answers.symptoms.join(', ') || 'None'}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-bg rounded-2xl shadow-soft max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <div className="flex items-center">
            {IconComponent && <IconComponent className="w-6 h-6 text-accent mr-3" />}
            <h1 className="font-headline text-xl font-semibold">{currentStepData.title}</h1>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="font-body text-sm text-muted mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t border-muted">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-accent text-bg rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CycleOnboarding;
