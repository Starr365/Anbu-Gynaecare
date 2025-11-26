'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Droplet, ShoppingBag, BookOpen, User, Heart, Recycle, Users as UsersIcon, X } from 'lucide-react';
import { useCyclePredictions, useCycleLogs } from '@/hooks/useCycle';
import { formatPredictionDate } from '@/services/predictions';
import BottomNavigation from './BottomNavigation';
import CycleOnboarding from '../CycleOnboarding';

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cycleOnboardingCompleted') === 'true';
    } catch {
      return false;
    }
  });
  const [showTooltips, setShowTooltips] = useState<boolean>(() => {
    try {
      return !(localStorage.getItem('cycleOnboardingCompleted') === 'true');
    } catch {
      return false;
    }
  });

  // Fetch cycle data
  const { prediction, daysUntil, loading: predictionsLoading } = useCyclePredictions();
  const { logs } = useCycleLogs();

  const handleTrackClick = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setHasCompletedOnboarding(true);
    setShowTooltips(false);
    localStorage.setItem('cycleOnboardingCompleted', 'true');
    // Redirect to track page
    window.location.href = '/track';
  };

  const dismissTooltips = () => {
    setShowTooltips(false);
  };
  return (
    <div className="min-h-screen bg-rose pb-13">
      <div className='max-w-md mx-auto bg-bg shadow-md'>
      {/* Welcome Header */}
      <section className="bg-linear-to-r from-rose to-blush text-text px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-headline text-2xl font-semibold mb-2">
            Hi, User! 👋
          </h1>
          <p className="font-body text-lg">
            Here&apos;s what&apos;s happening with your cycle
          </p>
        </div>
      </section>

      {/* Navigation Tooltips */}
      {showTooltips && (
        <section className="px-4 py-6">
          <div className="max-w-md mx-auto bg-lavender rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-lg font-semibold text-text">Quick Start Guide</h2>
              <button onClick={dismissTooltips} className="p-1 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm font-body text-muted">
              <p>🗓️ <strong>Track:</strong> Log your period and get cycle predictions</p>
              <p>🛒 <strong>Shop:</strong> Eco-friendly pads and wellness products</p>
              <p>📚 <strong>Learn:</strong> Articles and tips for your cycle</p>
              <p>👤 <strong>You:</strong> Your profile and personalized insights</p>
            </div>
            <button onClick={dismissTooltips} className="w-full mt-4 bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
              Got it!
            </button>
          </div>
        </section>
      )}

      {/* Begin Cycle Tracking Card */}
      {!hasCompletedOnboarding && (
        <section className="px-4 py-6">
          <div className="max-w-md mx-auto bg-accent text-bg rounded-2xl p-6 shadow-soft animate-slide-up">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h2 className="font-headline text-xl font-semibold mb-2">Begin Cycle Tracking</h2>
              <p className="font-body text-sm mb-4 opacity-90">
                Start your journey to better understand your body. We&apos;ll ask a few questions to personalize your experience.
              </p>
              <button
                onClick={handleTrackClick}
                className="bg-bg text-accent font-semibold py-3 px-6 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Next Period Countdown */}
      {hasCompletedOnboarding && (
        <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-blush rounded-2xl p-6 shadow-soft animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-xl font-semibold text-text">Next Period In</h2>
            <Calendar className="w-6 h-6 text-accent" />
          </div>
          {predictionsLoading ? (
            <div className="animate-pulse">
              <div className="h-12 bg-muted/20 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted/20 rounded w-2/3 mx-auto"></div>
            </div>
          ) : prediction && daysUntil ? (
            <>
              <div className="text-center mb-4">
                <span className="font-headline text-4xl font-bold text-accent">{daysUntil}</span>
                <span className="font-body text-lg text-muted ml-2">Days</span>
              </div>
              <p className="font-body text-sm text-muted mb-4">
                Expected on {prediction.predictedDate ? formatPredictionDate(prediction.predictedDate) : 'N/A'}. 
                {prediction.cycle_length && ` Your cycle is regular at ${prediction.cycle_length} days.`}
              </p>
            </>
          ) : (
            <p className="font-body text-sm text-muted text-center">Complete your cycle setup to see predictions</p>
          )}
          <Link 
            href="/track"
            className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 block text-center"
          >
            Track Today
          </Link>
        </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold text-text mb-4 text-center">Quick Actions</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          {hasCompletedOnboarding ? (
            <Link href="/track" className="bg-sand rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-headline text-sm font-semibold text-text">Log Period</h3>
              <p className="font-body text-xs text-muted">Track your flow & mood</p>
            </Link>
          ) : (
            <button onClick={handleTrackClick} className="bg-sand rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-headline text-sm font-semibold text-text">Log Period</h3>
              <p className="font-body text-xs text-muted">Track your flow & mood</p>
            </button>
          )}
          <Link href="/shop" className="bg-mint rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <ShoppingBag className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold text-text">Shop Pads</h3>
            <p className="font-body text-xs text-muted">Get eco-friendly pads</p>
          </Link>
          <Link href="/learn" className="bg-lavender rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold text-text">Learn</h3>
            <p className="font-body text-xs text-muted">Articles & tips</p>
          </Link>
          <Link href="/you" className="bg-blush rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <User className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold text-text">My Profile</h3>
            <p className="font-body text-xs text-muted">Settings & insights</p>
          </Link>
        </div>
      </section>

      {/* Today's Wellness Tip */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-mint rounded-2xl p-6 shadow-soft">
          <div className="flex items-center mb-4">
            <Droplet className="w-6 h-6 text-accent mr-2" />
            <h2 className="font-headline text-lg font-semibold text-text">Today&apos;s Wellness Tip</h2>
          </div>
          <p className="font-body text-sm text-muted mb-4">
            💧 Stay Hydrated<br />
            Drinking plenty of water can help reduce bloating and ease cramps during your period.
          </p>
          <button className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            Read more tips
          </button>
        </div>
      </section>

      {/* Low Supply Warning */}
      {hasCompletedOnboarding && daysUntil && daysUntil <= 7 && (
        <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-sand rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-lg font-semibold text-text mb-4">Running Low on Pads?</h2>
          <p className="font-body text-sm text-muted mb-4">
            Based on your cycle, you&apos;ll need more pads in {daysUntil} days.
          </p>
          <Link 
            href="/shop"
            className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300 inline-block"
          >
            Order Now
          </Link>
        </div>
        </section>
      )}

      {/* Care Package */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-lavender rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-lg font-semibold text-text mb-2">Send a Care Package</h2>
          <p className="font-body text-sm text-muted mb-4">
            Gift pads and wellness items to a friend
          </p>
          <button className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            Browse Gifts
          </button>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="px-4 py-6 bg-mint">
        <h2 className="font-headline text-xl font-semibold text-text mb-6 text-center">Our Impact Together</h2>
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-headline text-2xl font-bold text-accent mb-2">2.5M+</div>
            <p className="font-body text-sm text-muted">Pads Composted</p>
            <Recycle className="w-6 h-6 text-accent mx-auto mt-2" />
          </div>
          <div>
            <div className="font-headline text-2xl font-bold text-accent mb-2">450T</div>
            <p className="font-body text-sm text-muted">CO₂ Saved</p>
            <Heart className="w-6 h-6 text-accent mx-auto mt-2" />
          </div>
          <div>
            <div className="font-headline text-2xl font-bold text-accent mb-2">1.2K+</div>
            <p className="font-body text-sm text-muted">Farmers Supported</p>
            <UsersIcon className="w-6 h-6 text-accent mx-auto mt-2" />
          </div>
        </div>
      </section>

      </div>

      <BottomNavigation />

      {showOnboarding && (
        <CycleOnboarding
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      )}
    </div>
  );
};

export default Dashboard;