import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const allEnvVars = Object.keys(process.env).filter(key => 
    key.includes('STRIPE') || key.includes('NEXT_PUBLIC')
  );
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    stripeEnvVars: allEnvVars,
    stripeKeys: {
      hasSecret: !!process.env.STRIPE_SECRET_KEY,
      secretLength: process.env.STRIPE_SECRET_KEY?.length || 0,
      secretPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 15) || 'missing',
      hasPublic: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      publicLength: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.length || 0,
      publicPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 15) || 'missing',
    },
    allKeys: Object.keys(process.env).length
  });
}
