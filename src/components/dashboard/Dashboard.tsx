import React from 'react';
import Link from 'next/link';
import { Calendar, Droplet, ShoppingBag, BookOpen, User, Heart, Recycle, Users as UsersIcon } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const Dashboard = () => {
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
            Here&apos;s what&apos;s happening with your&apos; cycle
          </p>
        </div>
      </section>

      {/* Next Period Countdown */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-blush rounded-2xl p-6 shadow-soft animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-xl font-semibold text-text">Next Period In</h2>
            <Calendar className="w-6 h-6 text-accent" />
          </div>
          <div className="text-center mb-4">
            <span className="font-headline text-4xl font-bold text-accent">5</span>
            <span className="font-body text-lg text-muted ml-2">Days</span>
          </div>
          <p className="font-body text-sm text-muted mb-4">
            Expected on November 23. Your&apos; cycle is regular at 28 days.
          </p>
          <button className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Track Today
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold text-text mb-4 text-center">Quick Actions</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <Link href="/track" className="bg-sand rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold text-text">Log Period</h3>
            <p className="font-body text-xs text-muted">Track your flow & mood</p>
          </Link>
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
            Drinking plenty of water can help reduce bloating and ease cramps during your&apos; period.
          </p>
          <button className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            Read more tips
          </button>
        </div>
      </section>

      {/* Low Supply Warning */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-sand rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-lg font-semibold text-text mb-4">Running Low on Pads?</h2>
          <p className="font-body text-sm text-muted mb-4">
            Based on your&apos; cycle, you&apos;ll need more pads in 5 days.
          </p>
          <button className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            Order Now
          </button>
        </div>
      </section>

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
    </div>
  );
};

export default Dashboard;