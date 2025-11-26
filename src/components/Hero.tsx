'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

const Hero = () => {
  return (
    <motion.section
      className="text-text px-4 py-16 md:py-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md mx-auto text-center">
        <motion.h1
          className="font-headline text-3xl md:text-4xl font-semibold leading-tight"
          variants={itemVariants}
        >
          Anbu Gynaecare
        </motion.h1>
        <motion.p
          className="font-headline font-semibold text-md md:text-xl leading-relaxed mb-4"
          variants={itemVariants}
        >
          Period care that loves you back.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Image
            className="mx-auto mb-6"
            src="/anbu logo svg.svg"
            alt="Anbu Gynaecare Logo"
            width={150}
            height={120}
          />
        </motion.div>
        <motion.p
          className="font-body text-lg md:text-xl leading-relaxed mb-8 text-muted"
          variants={itemVariants}
        >
          Track your cycle, shop eco-friendly pads, and join a supportive community—all in one place.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row w-fit mx-auto gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/register"
              className="bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft inline-block text-center"
            >
              Get Started Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="bg-glass text-text font-semibold py-3 px-6 rounded-2xl shadow-soft inline-block text-center"
            >
              I Have an Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;