'use client';

import React, { useState } from 'react';
import { ShoppingCart, Leaf, Cloud, User, Package, X } from 'lucide-react';
import { useProducts, useShoppingCart } from '@/hooks/useProducts';
import { formatPrice } from '@/services/products';
import BottomNavigation from './BottomNavigation';

const Shop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const { cart, itemCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart } = useShoppingCart();

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
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-sand rounded-2xl p-4 shadow-soft animate-pulse">
                  <div className="h-6 bg-muted/20 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted/20 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-muted/20 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-sand rounded-2xl p-4 shadow-soft">
              <p className="font-body text-sm text-accent">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-sand rounded-2xl p-4 shadow-soft">
              <p className="font-body text-sm text-muted text-center">No products available</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-sand rounded-2xl p-4 shadow-soft">
                <h3 className="font-headline text-lg font-semibold mb-1">{product.title}</h3>
                <p className="font-body text-sm text-muted mb-2">{product.number_of_pad} pads per pack</p>
                {product.description && (
                  <p className="font-body text-xs text-muted mb-2">{product.description}</p>
                )}
                {product.environmental_impact && (
                  <p className="font-body text-xs text-green-600 mb-2">🌱 {product.environmental_impact}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-headline text-xl font-bold text-accent">
                    {product.price ? formatPrice(product.price) : 'N/A'}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg rounded-2xl p-6 max-w-sm w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="font-body text-muted text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-6 border-b border-muted pb-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start font-body text-sm">
                      <div className="flex-1">
                        <p className="font-semibold">{item.product.title}</p>
                        <p className="text-muted text-xs">₦{item.product.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-muted hover:text-accent"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-muted hover:text-accent"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-accent hover:text-rose ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 p-3 bg-blush/20 rounded-lg">
                  <div className="flex justify-between font-headline font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-accent">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => clearCart()}
                    className="flex-1 bg-muted text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="flex-1 bg-accent text-bg font-semibold py-2 px-4 rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Shop;