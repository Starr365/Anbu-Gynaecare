import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: '"This app made tracking my period so simple! And I love that the pads are eco-friendly."',
      name: 'Sarah, 22',
    },
    {
      text: '"Finally, pads that don\'t harm the planet. The subscription saves me so much time!"',
      name: 'Amara, 25',
    },
  ];

  return (
    <section className="py-16 px-4 bg-linear-to-br from-rose to-blush/20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-sand/80 rounded-2xl p-6 shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <p className="font-body text-lg leading-relaxed mb-4 text-text">
                {testimonial.text}
              </p>
              <p className="font-body font-semibold text-muted">
                – {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;