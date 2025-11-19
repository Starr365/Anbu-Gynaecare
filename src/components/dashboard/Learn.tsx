'use client';

import React, { useState } from 'react';
import { Search, BookOpen, User, Play } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const Learn = () => {
  const [search, setSearch] = useState('');

  const topics = [
    { name: 'All Topics', count: 12 },
    { name: 'Basics', count: 2 },
    { name: 'Wellness', count: 2 },
    { name: 'Nutrition', count: 1 },
    { name: 'For Teens', count: 1 },
    { name: 'Sustainability', count: 2 },
    { name: 'Health Conditions', count: 2 },
  ];

  const featuredArticles = [
    { title: 'Understanding Your Menstrual Cycle', category: 'Basics', time: '8 min' },
    { title: 'Managing Period Pain Naturally', category: 'Wellness', time: '10 min' },
  ];

  const allArticles = [
    { title: 'What is Menstruation?', category: 'Basics', time: '5 min' },
    { title: 'Healthy Eating During Periods', category: 'Nutrition', time: '7 min' },
    // Add more as needed
  ];

  const experts = [
    { name: 'Dr. Amina', title: 'Gynecologist', experience: '10 years' },
    { name: 'John Doe', title: 'Nutritionist', experience: '8 years' },
  ];

  const quickTips = ['Hydration', 'Movement', 'Rest', 'Nutrition'];

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <section className="bg-linear-to-r from-lavender to-rose text-text px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-headline text-2xl font-semibold mb-2">
            Learn & Grow
          </h1>
          <p className="font-body text-lg">
            Expert advice about your menstrual health
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
        </div>
      </section>

      {/* Topics */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {topics.map((topic, index) => (
              <button
                key={index}
                className="bg-sand rounded-2xl p-4 shadow-soft text-center hover:scale-105 transition-transform duration-300"
              >
                <h3 className="font-headline text-sm font-semibold">{topic.name}</h3>
                <p className="font-body text-xs text-muted">({topic.count})</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4 text-center">Featured Articles</h2>
        <div className="max-w-md mx-auto space-y-4">
          {featuredArticles.map((article, index) => (
            <div key={index} className="bg-mint rounded-2xl p-4 shadow-soft">
              <h3 className="font-headline text-lg font-semibold mb-1">{article.title}</h3>
              <p className="font-body text-sm text-muted">{article.category} • {article.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4 text-center">All Articles</h2>
        <div className="max-w-md mx-auto space-y-3">
          {allArticles.map((article, index) => (
            <div key={index} className="bg-blush rounded-2xl p-4 shadow-soft flex justify-between items-center">
              <div>
                <h3 className="font-headline text-sm font-semibold">{article.title}</h3>
                <p className="font-body text-xs text-muted">{article.category} • {article.time}</p>
              </div>
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Experts */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4 text-center">Meet the Experts</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          {experts.map((expert, index) => (
            <div key={index} className="bg-lavender rounded-2xl p-4 shadow-soft text-center">
              <User className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-headline text-sm font-semibold">{expert.name}</h3>
              <p className="font-body text-xs text-muted">{expert.title}</p>
              <p className="font-body text-xs text-muted">{expert.experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer Story */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-sand rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-lg font-semibold mb-2">Amina&apos;s Story</h2>
          <p className="font-body text-sm text-muted mb-4">Kano, 3 min watch</p>
          <button className="flex items-center bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            <Play className="w-4 h-4 mr-2" />
            Watch Video
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-blush rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-lg font-semibold mb-4">Weekly Health Tips</h2>
          <p className="font-body text-sm text-muted mb-4">Newsletter</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent mb-4"
          />
          <button className="w-full bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
            Subscribe Free
          </button>
        </div>
      </section>

      {/* Quick Daily Tips */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-4 text-center">Quick Daily Tips</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          {quickTips.map((tip, index) => (
            <div key={index} className="bg-mint rounded-2xl p-4 shadow-soft text-center">
              <h3 className="font-headline text-sm font-semibold">{tip}</h3>
            </div>
          ))}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Learn;