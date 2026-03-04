'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      // Redirect to Stripe checkout using the URL from API response
      window.location.href = url || `https://checkout.stripe.com/c/pay/${sessionId}`;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="w-full">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 mb-4 focus:outline-none focus:border-violet-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl font-semibold text-lg transition transform hover:scale-105"
      >
        {loading ? 'Processing...' : 'Purchase Now — $29'}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}
