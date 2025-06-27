import { useState } from 'react';

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (courseType: 'standard' | 'vip') => {
    setLoading(true);
    
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
        // Real Stripe session - redirect to Stripe checkout
        const stripeUrl = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
        console.log('Redirecting to Stripe:', stripeUrl);
        window.location.href = stripeUrl;
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
      setLoading(false);
    }
  };

  return {
    redirectToCheckout,
    loading,
  };
};
