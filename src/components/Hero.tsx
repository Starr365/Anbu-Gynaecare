import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-linear-to-br from-rose to-blush text-text px-4 py-16 md:py-24">
      <div className="max-w-md mx-auto text-center animate-fade-in">
        <h1 className="font-headline text-4xl md:text-5xl font-semibold leading-tight mb-4">
          Period care that loves you back.
        </h1>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8 text-muted">
          Track your cycle, shop eco-friendly pads, and join a supportive community—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 inline-block text-center">
            Get Started Free
          </Link>
          <Link href="/login" className="bg-glass text-text font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 inline-block text-center">
            I Have an Account
          </Link>
        </div>
        <div className="mt-8 text-6xl">
          🌸
        </div>
      </div>
    </section>
  );
};

export default Hero;