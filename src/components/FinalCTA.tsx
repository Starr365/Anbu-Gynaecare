import React from 'react';

const FinalCTA = () => {
  return (
    <section className="py-16 px-4 bg-lavender text-center">
      <div className="max-w-md mx-auto animate-fade-in">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4 text-text">
          Ready to get started?
        </h2>
        <p className="font-body text-lg leading-relaxed mb-8 text-muted">
          Join thousands of women taking control of their menstrual health.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Create Free Account
          </button>
          <button className="bg-glass text-text font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Log in
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;