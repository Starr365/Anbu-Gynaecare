import React from 'react';
import { Calendar, ShoppingBag, BookOpen, Users } from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      icon: <Calendar className="w-6 h-6 text-accent" />,
      title: 'Track',
      description: 'Know when your period is coming',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-mint" />,
      title: 'Shop',
      description: 'Eco-friendly pads delivered',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-lavender" />,
      title: 'Learn',
      description: 'Understand your body',
    },
    {
      icon: <Users className="w-6 h-6 text-blush" />,
      title: 'Connect',
      description: 'Join a supportive community',
    },
  ];

  return (
    <section className="py-16 px-4 bg-mint">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-12 text-text">
          Everything you need
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-bg rounded-xl p-4 shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-2">{tool.icon}</div>
              <h3 className="font-headline text-lg font-semibold mb-1 text-text">
                {tool.title}
              </h3>
              <p className="font-body text-sm text-muted">{tool.description}</p>
            </div>
          ))}
        </div>
        <button className="bg-accent text-bg font-semibold py-3 px-8 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default Tools;