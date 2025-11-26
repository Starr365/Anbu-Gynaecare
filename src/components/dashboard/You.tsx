'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, Bell, Shield, HelpCircle, MessageSquare, Info, LogOut } from 'lucide-react';
import { logoutUser } from '@/services/auth';
import { clearUserCache } from '@/services/user';
import { clearLogsCache } from '@/services/logs';
import { clearPredictionsCache } from '@/services/predictions';
import { clearProductsCache } from '@/services/products';
import BottomNavigation from './BottomNavigation';

const You = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all authentication tokens and cached data
    logoutUser();

    // Clear all cached API data
    clearUserCache();
    clearLogsCache();
    clearPredictionsCache();
    clearProductsCache();

    // Redirect to login page
    router.push('/login');
  };
  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* User Header */}
      <section className="bg-linear-to-r from-blush to-mint text-text px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-bg" />
          </div>
          <h1 className="font-headline text-2xl font-semibold mb-2">User Name</h1>
          <p className="font-body text-sm">Member since Nov 2024</p>
        </div>
      </section>

      {/* Cycle Insights */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4 text-center">Cycle Insights</h2>
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4">
          <div className="bg-sand rounded-2xl p-4 shadow-soft text-center">
            <h3 className="font-headline text-2xl font-bold text-accent">28</h3>
            <p className="font-body text-sm text-muted">Avg Cycle</p>
          </div>
          <div className="bg-lavender rounded-2xl p-4 shadow-soft text-center">
            <h3 className="font-headline text-2xl font-bold text-accent">5</h3>
            <p className="font-body text-sm text-muted">Period Days</p>
          </div>
          <div className="bg-rose rounded-2xl p-4 shadow-soft text-center">
            <h3 className="font-headline text-2xl font-bold text-accent">12</h3>
            <p className="font-body text-sm text-muted">Logs</p>
          </div>
        </div>
        <p className="font-body text-sm text-muted text-center mt-4">
          Keep logging to get better predictions!
        </p>
      </section>

      {/* Account Settings */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4">Account Settings</h2>
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between bg-blush rounded-2xl p-4 shadow-soft">
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-accent mr-3" />
              <span className="font-body text-sm">Settings</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-mint rounded-2xl p-4 shadow-soft">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-accent mr-3" />
              <span className="font-body text-sm">Notifications</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-lavender rounded-2xl p-4 shadow-soft">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-accent mr-3" />
              <span className="font-body text-sm">Privacy</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-sand rounded-2xl p-4 shadow-soft">
            <div className="flex items-center">
              <User className="w-5 h-5 text-accent mr-3" />
              <span className="font-body text-sm">Subscription</span>
            </div>
            <span className="font-body text-xs text-muted">Free Plan</span>
            <button className="bg-accent text-bg font-semibold py-1 px-3 rounded-xl text-xs">
              Upgrade
            </button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4">Support</h2>
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center bg-rose rounded-2xl p-4 shadow-soft">
            <HelpCircle className="w-5 h-5 text-accent mr-3" />
            <span className="font-body text-sm">Help & FAQs</span>
          </div>
          <div className="flex items-center bg-blush rounded-2xl p-4 shadow-soft">
            <Info className="w-5 h-5 text-accent mr-3" />
            <span className="font-body text-sm">About Anbu</span>
          </div>
          <div className="flex items-center bg-mint rounded-2xl p-4 shadow-soft">
            <MessageSquare className="w-5 h-5 text-accent mr-3" />
            <span className="font-body text-sm">Send Feedback</span>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-lavender rounded-2xl p-6 shadow-soft text-center">
          <h2 className="font-headline text-lg font-semibold mb-4">Your Impact</h2>
          <p className="font-body text-sm text-muted mb-2">
            By using Anbu, you&apos;ve helped save:
          </p>
          <p className="font-headline text-lg font-bold text-accent">2.4kg Plastic Waste</p>
          <p className="font-headline text-lg font-bold text-accent">1.8kg CO₂ Saved</p>
        </div>
      </section>

      {/* Logout */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </section>

      {/* Version */}
      <div className="text-center py-4">
        <p className="font-body text-xs text-muted">Version 1.0.0</p>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default You;