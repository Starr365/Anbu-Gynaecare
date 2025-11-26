'use client';

import React from 'react';
import { Leaf, Heart, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

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
    <motion.section
      className="py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-headline text-3xl md:text-4xl font-semibold text-center mb-12 text-text"
          variants={itemVariants}
        >
          Why Choose Anbu?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-bg rounded-2xl p-6 shadow-soft"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-row gap-4 mb-2 md:flex-col md:items-center">
                <span>{feature.icon}</span>
                <h3 className="font-headline text-xl font-semibold mb-2 text-text">
                  {feature.title}
                </h3>
              </div>
              <p className="font-body text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseAnbu;