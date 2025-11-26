'use client';

import Link from 'next/link';
import React from 'react';
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

const FinalCTA = () => {
  return (
    <motion.section
      className="py-16 px-4 bg-linear-to-br from-sand/10 to-blush text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md mx-auto">
        <motion.h2
          className="font-headline text-3xl md:text-4xl font-semibold mb-4 text-text"
          variants={itemVariants}
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          className="font-body text-lg leading-relaxed mb-8 text-muted"
          variants={itemVariants}
        >
          Join thousands of women taking control of their menstrual health.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row w-full gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/register"
              className="bg-glass text-text font-semibold py-3 px-6 rounded-2xl shadow-soft inline-block"
            >
              Create Free Account
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="bg-transparent border border-accent text-text font-semibold py-3 px-6 rounded-2xl shadow-soft inline-block"
            >
              Log in
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTA;