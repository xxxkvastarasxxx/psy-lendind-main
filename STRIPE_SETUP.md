# Stripe Integration Setup - Complete Guide

## 🎯 Current Status
✅ **Demo Mode Active**: Payment buttons work with demo flow  
✅ **Environment Variables**: Your Stripe keys are configured  
✅ **UI Complete**: Payment flow and success page implemented  
✅ **Server Running**: http://localhost:3001  

## 🔄 Current Demo Flow
1. Click course button → Shows demo alert
2. Redirects to success page with demo session ID
3. Beautiful success page with course confirmation

## 🚀 To Enable Real Stripe Payments:

### Step 1: Install Stripe Packages Properly
```bash
npm install stripe @stripe/stripe-js
```

### Step 2: Update API Route
Replace `/app/api/checkout/route.ts` with real Stripe integration:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { courseType } = await request.json();

    const courseDetails = {
      standard: {
        name: 'Курс "Стандарт" - Восстановление после измены',
        price: 4900, // $49 in cents
        description: '5 уроков теории + 5 практических занятий + рабочая тетрадь'
      },
      vip: {
        name: 'Курс "VIP" - Восстановление после измены', 
        price: 10000, // $100 in cents
        description: 'Всё из тарифа "Стандарт" + консультация + обратная связь'
      }
    };

    const course = courseDetails[courseType as keyof typeof courseDetails];
    
    if (!course) {
      return NextResponse.json({ error: 'Invalid course type' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.name,
              description: course.description,
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: { courseType },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

### Step 3: Update Checkout Hook
Replace `/hooks/use-stripe-checkout.ts`:

```typescript
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (courseType: 'standard' | 'vip') => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseType }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { redirectToCheckout, loading };
};
```

### Step 4: Test with Test Keys First
Before using live keys, test with:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Step 5: Go Live
Switch to live keys when ready for production.

## 📋 Testing Checklist
- [ ] Install Stripe packages
- [ ] Update API route with real Stripe code
- [ ] Update checkout hook with real Stripe code  
- [ ] Test with test keys first
- [ ] Switch to live keys for production

## 💳 Current Pricing
- **Standard Course**: $49
- **VIP Course**: $100

## 🎉 What Works Now
Your website is fully functional with:
- ✅ Beautiful UI and animations
- ✅ Professional navy blue theme
- ✅ Testimonials with photos
- ✅ Demo payment flow
- ✅ Success page

**Ready to test**: http://localhost:3001
