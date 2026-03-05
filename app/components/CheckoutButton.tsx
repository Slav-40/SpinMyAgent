'use client';

import { useState, useEffect } from 'react';

// Email validation regex (same as server-side)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function CheckoutButton() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Validate email on change (live feedback)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length === 0) {
      setEmailError('');
      return;
    }

    const trimmed = value.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('Please enter a valid email address');
    } else if (trimmed.length > 255) {
      setEmailError('Email address is too long');
    } else {
      setEmailError('');
    }
  };

  const isEmailValid = email.trim().length > 0 && EMAIL_REGEX.test(email.trim().toLowerCase());

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side email validation
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (trimmedEmail.length > 255) {
      setError('Email address is too long');
      setLoading(false);
      return;
    }

    // Get CSRF token from cookie (set by middleware)
    const csrfToken = getCookie('csrf-token');
    if (!csrfToken) {
      setError('Session expired. Please refresh the page and try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError('Too many requests. Please wait a moment and try again.');
        } else if (response.status === 403) {
          setError('Session expired. Please refresh the page and try again.');
        } else {
          setError(data.error || 'Failed to create checkout session. Please try again.');
        }
        setLoading(false);
        return;
      }

      const { sessionId, url } = data;

      // Redirect to Stripe checkout
      window.location.href = url || `https://checkout.stripe.com/c/pay/${sessionId}`;
    } catch (err: any) {
      setError('An error occurred. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="w-full">
      <div className="mb-4">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          required
          maxLength={255}
          autoComplete="email"
          className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none transition ${
            emailError
              ? 'border-red-400 focus:border-red-400'
              : 'border-white/20 focus:border-violet-400'
          }`}
        />
        {emailError && (
          <p className="text-red-400 text-sm mt-1">{emailError}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading || !isEmailValid}
        className="w-full px-8 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition transform hover:scale-105"
      >
        {loading ? 'Processing...' : 'Purchase Now — $29'}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}
