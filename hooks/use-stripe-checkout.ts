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
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      
      // For demo purposes, show course details and redirect to success page
      const courseDetails = {
        standard: { name: 'Курс "Стандарт"', price: '$49' },
        vip: { name: 'Курс "VIP"', price: '$100' }
      };
      
      const course = courseDetails[courseType];
      
      // Simulate successful payment flow
      alert(`Демо-режим оплаты:\n\n${course.name}\nЦена: ${course.price}\n\nВ реальном режиме здесь будет перенаправление на Stripe Checkout.\n\nСейчас перенаправим на страницу успеха для демонстрации.`);
      
      // Redirect to success page with demo session ID
      window.location.href = `/success?session_id=demo_${courseType}_${Date.now()}`;
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Произошла ошибка при обработке платежа. В реальном приложении здесь будет полная интеграция с Stripe.');
    } finally {
      setLoading(false);
    }
  };

  return {
    redirectToCheckout,
    loading,
  };
};
