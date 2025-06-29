import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);

  // Reset loading state when component mounts or when user returns to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setLoading(false);
      }
    };

    const handleFocus = () => {
      setLoading(false);
    };

    // Reset loading state when page becomes visible again
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Also reset on mount
    setLoading(false);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const redirectToCheckout = async (courseType: 'standard' | 'vip') => {
    // Prevent multiple simultaneous checkout attempts
    if (loading) {
      return;
    }

    setLoading(true);
    
    // Auto-reset loading state after 30 seconds as a failsafe
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 30000);

    // Minimum loading time for better UX (2 seconds)
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseType,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', response.status, errorText);
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log('Checkout response:', data);
      
      // Check if we have a real Stripe sessionId (starts with cs_)
      if (data.sessionId && data.sessionId.startsWith('cs_') && data.mode === 'live') {
        // Real Stripe session - use Stripe's redirect method
        console.log('Redirecting to Stripe with session:', data.sessionId);
        
        // Get the publishable key from environment
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        
        if (!publishableKey) {
          console.error('Stripe publishable key not found');
          throw new Error('Stripe configuration error');
        }
        
        console.log('Using Stripe publishable key:', publishableKey.substring(0, 15) + '...');
        
        // Load Stripe and redirect
        const stripe = await loadStripe(publishableKey);
        
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        
        if (error) {
          console.error('Stripe redirect error:', error);
          throw new Error(error.message);
        }
        
        return;
      }
      
      // Handle demo mode or fallback
      const courseDetails = {
        standard: { name: 'Курс "Стандарт"', price: '$49' },
        vip: { name: 'Курс "VIP"', price: '$100' }
      };
      
      const course = courseDetails[courseType];
      
      if (data.mode === 'demo' || !data.sessionId.startsWith('cs_')) {
        // Demo mode with detailed reason
        let message = `Демо-режим оплаты:\n\n${course.name}\nЦена: ${course.price}\n\n`;
        
        if (data.reason) {
          message += `Причина: ${data.reason}\n\n`;
        }
        
        message += 'В реальном режиме здесь будет перенаправление на Stripe Checkout.\n\nПерейдем на страницу успеха для демонстрации.';
        
        alert(message);
      }
      
      // Redirect to success page
      window.location.href = `/success?session_id=${data.sessionId}`;
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      
      // Provide fallback demo experience
      const courseDetails = {
        standard: { name: 'Курс "Стандарт"', price: '$49' },
        vip: { name: 'Курс "VIP"', price: '$100' }
      };
      
      const course = courseDetails[courseType];
      
      alert(`Временная проблема с платежной системой.\n\nОшибка: ${error.message || 'Unknown error'}\n\nДемо-режим:\n${course.name}\nЦена: ${course.price}\n\nДля настоящей покупки обратитесь по email: twizug55@gmail.com`);
      
      // Still show success page for demo
      window.location.href = `/success?session_id=demo_error_${courseType}_${Date.now()}`;
    } finally {
      clearTimeout(timeoutId);
      
      // Ensure minimum loading time of 2 seconds for better UX
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 2000; // 2 seconds
      
      if (elapsedTime < minLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minLoadingTime - elapsedTime);
      } else {
        setLoading(false);
      }
    }
  };

  const resetLoading = () => {
    setLoading(false);
  };

  return {
    redirectToCheckout,
    loading,
    resetLoading,
  };
};
