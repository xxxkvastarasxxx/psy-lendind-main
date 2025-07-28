import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Handle demo sessions
    if (sessionId.startsWith('demo_')) {
      const courseType = sessionId.includes('basic') ? 'basic' : 
                        sessionId.includes('standard') ? 'standard' : 
                        sessionId.includes('vip') ? 'vip' : 'basic';
      
      return NextResponse.json({
        courseType,
        mode: 'demo',
        sessionId
      });
    }

    // For real Stripe sessions
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey || !stripeSecretKey.startsWith("sk_")) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    });

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status === 'unpaid' || session.status === 'expired') {
      return NextResponse.json({
        courseType: session.metadata?.courseType || 'basic',
        mode: 'failed',
        sessionId: session.id,
        paymentStatus: session.payment_status,
        status: session.status,
        reason: session.status === 'expired' ? 'expired' : 'failed'
      });
    }

    return NextResponse.json({
      courseType: session.metadata?.courseType || 'basic',
      mode: 'live',
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email
    });

  } catch (error: any) {
    console.error("Session details error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to retrieve session details",
        courseType: 'basic' // Fallback to basic course
      },
      { status: 500 }
    );
  }
}
