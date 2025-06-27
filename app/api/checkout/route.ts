import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { courseType } = await request.json();

    // Define course details
    const courseDetails = {
      standard: {
        name: 'Курс "Стандарт" - Восстановление после измены',
        price: 4900, // $49 in cents
        description: '5 уроков теории + 5 практических занятий + рабочая тетрадь + пожизненный доступ'
      },
      vip: {
        name: 'Курс "VIP" - Восстановление после измены',
        price: 10000, // $100 in cents
        description: 'Всё из тарифа "Стандарт" + индивидуальная консультация + персональная обратная связь'
      }
    };

    const course = courseDetails[courseType as keyof typeof courseDetails];
    
    if (!course) {
      return NextResponse.json({ error: 'Invalid course type' }, { status: 400 });
    }

    // Create Stripe checkout session
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
      metadata: {
        courseType,
      },
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
