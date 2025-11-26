'use client';

import React from 'react';
import { Calendar, ShoppingBag, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
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

const Tools = () => {
  const tools = [
    {
      icon: <Calendar className="w-6 h-6 text-text" />,
      title: 'Track',
      description: 'Know when your period is coming',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-text" />,
      title: 'Shop',
      description: 'Eco-friendly pads delivered',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-text" />,
      title: 'Learn',
      description: 'Understand your body',
    },
    {
      icon: <Users className="w-6 h-6 text-text" />,
      title: 'Connect',
      description: 'Join a supportive community',
    },
  ];

  return (
    <motion.section
      className="py-16 px-4 bg-linear-to-br from-mint/20 to-rose"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-headline text-3xl md:text-4xl font-semibold mb-12 text-text"
          variants={itemVariants}
        >
          Everything you need
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="bg-sand/80 rounded-xl shadow-md p-4 shadow-soft"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className='flex flex-row gap-2 md:items-center'>
                <span className="">{tool.icon}</span>
                <h3 className="font-headline text-lg font-semibold mb-1 text-text">
                  {tool.title}
                </h3>
              </div>
              <p className="font-body text-sm text-muted align-start">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/register"
            className="bg-accent text-bg font-semibold py-3 px-8 rounded-2xl shadow-soft inline-block"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Tools;