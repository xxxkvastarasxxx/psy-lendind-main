import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Health check called at:', new Date().toISOString());
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    stripe: {
      hasSecretKey: !!stripeSecretKey,
      secretKeyLength: stripeSecretKey?.length || 0,
      secretKeyPrefix: stripeSecretKey?.substring(0, 10) || 'missing',
      hasPublishableKey: !!stripePublishableKey,
      publishableKeyPrefix: stripePublishableKey?.substring(0, 15) || 'missing',
      keysValid: !!(stripeSecretKey && stripePublishableKey && 
                   stripeSecretKey.startsWith('sk_') && 
                   stripePublishableKey.startsWith('pk_'))
    },
    origin: request.headers.get('origin'),
    userAgent: request.headers.get('user-agent')?.substring(0, 50)
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
