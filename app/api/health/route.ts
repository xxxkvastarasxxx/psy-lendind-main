import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Health check called at:', new Date().toISOString());
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasStripePublic: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    origin: request.headers.get('origin'),
    userAgent: request.headers.get('user-agent')
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
