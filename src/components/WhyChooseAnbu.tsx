import React from 'react';
import { Leaf, Heart, Lock } from 'lucide-react';

const WhyChooseAnbu = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-mint" />,
      title: '100% Biodegradable',
      description: 'Pads decompose naturally in 6–12 months.',
    },
    {
      icon: <Heart className="w-8 h-8 text-blush" />,
      title: 'Made with Care',
      description: 'Gentle on your skin, supporting local farmers.',
    },
    {
      icon: <Lock className="w-8 h-8 text-lavender" />,
      title: 'Private & Supportive',
      description: 'Track your cycle privately. Learn & connect.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center mb-12 text-text">
          Why Choose Anbu?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-sand rounded-2xl p-6 shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-headline text-xl font-semibold mb-2 text-text">
                {feature.title}
              </h3>
              <p className="font-body text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAnbu;