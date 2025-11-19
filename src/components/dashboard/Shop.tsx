'use client';

import React, { useState } from 'react';
import { ShoppingCart, Leaf, Cloud, User, Package } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const Shop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ name: string; price: string }[]>([]);

  const products = [
    { name: 'Regular Flow Pack', details: '10 pads', price: '₦3,200' },
    { name: 'Light Flow Pack', details: '12 pads', price: '₦2,800' },
    { name: 'Heavy Flow Pack', details: '8 pads', price: '₦3,500' },
  ];

  const addToCart = (product: { name: string; price: string }) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <section className="bg-linear-to-r from-mint to-lavender text-text px-4 py-8">
        <div className="max-w-md mx-auto text-center relative">
          <h1 className="font-headline text-2xl font-semibold mb-2">
            Shop Eco Pads
          </h1>
          <p className="font-body text-lg">
            Biodegradable pads delivered to your door
          </p>
          <p className="font-body text-sm mt-2">🌱 100% biodegradable – decompose in 6–12 months</p>
          <button
            onClick={() => setCartOpen(true)}
            className="absolute top-0 right-0 bg-accent text-bg p-2 rounded-full shadow-soft"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {products.map((product, index) => (
            <div key={index} className="bg-sand rounded-2xl p-4 shadow-soft">
              <h3 className="font-headline text-lg font-semibold mb-1">{product.name}</h3>
              <p className="font-body text-sm text-muted mb-2">{product.details}</p>
              <div className="flex justify-between items-center">
                <span className="font-headline text-xl font-bold text-accent">{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto bg-blush rounded-2xl p-6 shadow-soft">
          <h2 className="font-headline text-xl font-semibold mb-4">Subscribe & Save 20%</h2>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center font-body text-sm">
              <span className="text-green-600 mr-2">✔</span> 20% off
            </li>
            <li className="flex items-center font-body text-sm">
              <span className="text-green-600 mr-2">✔</span> Free delivery
            </li>
            <li className="flex items-center font-body text-sm">
              <span className="text-green-600 mr-2">✔</span> Pause anytime
            </li>
          </ul>
          <button className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300">
            Start Subscription
          </button>
        </div>
      </section>

      {/* Care Package */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="font-headline text-xl font-semibold mb-4 text-center">Send a Care Package</h2>
          <p className="font-body text-sm text-muted mb-4 text-center">
            Snacks + pads + note.
          </p>
          <div className="space-y-4">
            <div className="bg-lavender rounded-2xl p-4 shadow-soft">
              <h3 className="font-headline text-lg font-semibold mb-2">Student Box</h3>
              <p className="font-body text-sm text-muted mb-2">₦5,500</p>
              <button className="w-full bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
                Create Gift Box
              </button>
            </div>
            <div className="bg-rose rounded-2xl p-4 shadow-soft">
              <h3 className="font-headline text-lg font-semibold mb-2">First Timer</h3>
              <p className="font-body text-sm text-muted mb-2">₦4,200</p>
              <button className="w-full bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300">
                Create Gift Box
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Pads */}
      <section className="px-4 py-6">
        <h2 className="font-headline text-xl font-semibold mb-6 text-center">Why Our Pads?</h2>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="bg-mint rounded-2xl p-4 shadow-soft text-center">
            <Leaf className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold">100% biodegradable</h3>
          </div>
          <div className="bg-blush rounded-2xl p-4 shadow-soft text-center">
            <Cloud className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold">Super comfortable</h3>
          </div>
          <div className="bg-lavender rounded-2xl p-4 shadow-soft text-center">
            <User className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold">Farmer supported</h3>
          </div>
          <div className="bg-sand rounded-2xl p-4 shadow-soft text-center">
            <Package className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-headline text-sm font-semibold">Discreet packaging</h3>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="font-headline text-xl font-semibold mb-4">Cart</h2>
            {cart.length === 0 ? (
              <p className="font-body text-muted">Your cart is empty</p>
            ) : (
              <ul className="space-y-2 mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between font-body text-sm">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-full bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Shop;