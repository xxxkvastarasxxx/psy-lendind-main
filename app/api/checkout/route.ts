import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { courseType } = await request.json();

    // Define course details
    const courseDetails = {
      standard: {
        name: 'Курс "Стандарт" - Восстановление после измены',
        price: 49,
        description: '5 уроков теории + 5 практических занятий + рабочая тетрадь + пожизненный доступ'
      },
      vip: {
        name: 'Курс "VIP" - Восстановление после измены',
        price: 100,
        description: 'Всё из тарифа "Стандарт" + индивидуальная консультация + персональная обратная связь'
      }
    };

    const course = courseDetails[courseType as keyof typeof courseDetails];
    
    if (!course) {
      return NextResponse.json({ error: 'Invalid course type' }, { status: 400 });
    }

    // For now, return a placeholder response
    // In production, you would integrate with Stripe here
    return NextResponse.json({ 
      sessionId: 'placeholder_session_id',
      course: course,
      message: 'This is a demo. Real Stripe integration would create a session here.'
    });

  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
