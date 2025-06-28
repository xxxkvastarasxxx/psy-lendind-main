import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  console.log('API route called:', new Date().toISOString());
  
  try {
    // Log environment info
    console.log('Environment info:', {
      nodeEnv: process.env.NODE_ENV,
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasStripePublic: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      origin: request.headers.get('origin')
    });

    const body = await request.json();
    console.log('Request body:', body);
    
    const { courseType } = body;

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
      console.log('Invalid course type:', courseType);
      return NextResponse.json({ error: 'Invalid course type' }, { status: 400 });
    }

    // Check if Stripe keys are available and valid
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    console.log('Stripe keys check:', {
      hasSecretKey: !!stripeSecretKey,
      secretKeyLength: stripeSecretKey?.length || 0,
      secretKeyPrefix: stripeSecretKey?.substring(0, 15) || 'missing',
      hasPublishableKey: !!stripePublishableKey,
      publicKeyPrefix: stripePublishableKey?.substring(0, 15) || 'missing'
    });

    if (!stripeSecretKey || !stripePublishableKey) {
      console.log('Stripe keys missing, using demo mode');
      return NextResponse.json({ 
        sessionId: `demo_${courseType}_${Date.now()}`,
        course: course,
        mode: 'demo',
        reason: 'Missing Stripe keys'
      });
    }

    if (!stripeSecretKey.startsWith('sk_')) {
      console.log('Invalid Stripe secret key format, using demo mode');
      return NextResponse.json({ 
        sessionId: `demo_${courseType}_${Date.now()}`,
        course: course,
        mode: 'demo',
        reason: 'Invalid Stripe secret key format'
      });
    }

    // Try to use Stripe if available
    try {
      console.log('Initializing Stripe...');
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2024-06-20',
      });

      console.log('Creating checkout session...');
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
        // Add billing address collection
        billing_address_collection: 'auto',
        // Allow promotion codes
        allow_promotion_codes: true,
      });

      console.log('Stripe session created successfully:', session.id);
      return NextResponse.json({ sessionId: session.id, mode: 'live' });

    } catch (stripeError: any) {
      console.error('Stripe error details:', {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        decline_code: stripeError.decline_code,
        param: stripeError.param,
        detail: stripeError.detail,
        headers: stripeError.headers,
        requestId: stripeError.requestId,
        statusCode: stripeError.statusCode,
        stack: stripeError.stack
      });
      
      // Return specific error information
      return NextResponse.json({ 
        error: `Stripe error: ${stripeError.message}`,
        errorType: stripeError.type,
        errorCode: stripeError.code,
        sessionId: `demo_${courseType}_${Date.now()}`,
        course: course,
        mode: 'demo',
        reason: 'Stripe checkout creation failed'
      });
    }

  } catch (err: any) {
    console.error('Checkout error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    
    return NextResponse.json({ 
      error: `Server error: ${err.message}`,
      sessionId: `demo_error_${Date.now()}`,
      mode: 'demo'
    }, { status: 200 }); // Return 200 to prevent client-side error
  }
}
