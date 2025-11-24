import Link from 'next/link';
import React from 'react';

const FinalCTA = () => {
  return (
    <section className="py-16 px-4 bg-linear-to-bl from-sand/10 to-blush text-center">
      <div className="max-w-md mx-auto animate-fade-in">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4 text-text">
          Ready to get started?
        </h2>
        <p className="font-body text-lg leading-relaxed mb-8 text-muted">
          Join thousands of women taking control of their menstrual health.
        </p>
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-center">
          <Link href="/register" className="bg-glass text-text font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Create Free Account
          </Link>
          <Link href="/login" className="bg-transparent border border-accent text-text font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;