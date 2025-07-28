# Course-Specific Telegram Bot Links Setup

## Overview
The website now supports different Telegram bot links for each course tier. Users will see the appropriate link based on which course they purchased.

## Course Tiers and Default Links

### Basic Course ($29)
- **Course Name**: "Самостоятельная работа"
- **Default Link**: `https://t.me/SvetlanaTsyganova_basic_bot?start=basic_course`
- **Features**: 5 video lessons + workbook + 30-day access

### Standard Course ($59)
- **Course Name**: "Поддержка и сообщество"  
- **Default Link**: `https://t.me/SvetlanaTsyganova_standard_bot?start=standard_course`
- **Features**: Everything from Basic + private chat + lifetime access + author responses

### VIP Course ($129)
- **Course Name**: "Личное сопровождение"
- **Default Link**: `https://t.me/SvetlanaTsyganova_vip_bot?start=vip_course`
- **Features**: Everything from Standard + 60-minute consultation + personal questions

## How to Customize Bot Links

### Option 1: Edit the Success Page Directly
Navigate to: `app/success/page.tsx`

Find the `getCourseData` function and update the `telegramLink` for each course:

```typescript
const courseConfigs = {
  basic: {
    courseType: 'basic',
    courseName: 'Курс "Самостоятельная работа"',
    telegramLink: 'https://t.me/YOUR_BASIC_BOT?start=YOUR_PARAMETER',
    courseDescription: '5 теоретических видеоуроков + рабочая тетрадь + доступ на 30 дней'
  },
  standard: {
    courseType: 'standard',
    courseName: 'Курс "Поддержка и сообщество"',
    telegramLink: 'https://t.me/YOUR_STANDARD_BOT?start=YOUR_PARAMETER',
    courseDescription: 'Всё из базового + доступ в закрытый чат + ответы от автора + пожизненный доступ'
  },
  vip: {
    courseType: 'vip',
    courseName: 'Курс "Личное сопровождение"',
    telegramLink: 'https://t.me/YOUR_VIP_BOT?start=YOUR_PARAMETER',
    courseDescription: 'Всё из тарифа "Стандарт" + индивидуальная консультация + личные вопросы автору'
  }
};
```

### Option 2: Use Environment Variables (Recommended for Production)
You can modify the code to use environment variables for easier management:

1. Add to your `.env.local` or Netlify environment variables:
```
TELEGRAM_BOT_BASIC=https://t.me/YOUR_BASIC_BOT?start=YOUR_PARAMETER
TELEGRAM_BOT_STANDARD=https://t.me/YOUR_STANDARD_BOT?start=YOUR_PARAMETER  
TELEGRAM_BOT_VIP=https://t.me/YOUR_VIP_BOT?start=YOUR_PARAMETER
```

2. Update the `getCourseData` function to use these variables.

## How It Works

### Payment Flow
1. **User selects course** → Clicks payment button
2. **Stripe processes payment** → Redirects to success page with session ID and course type
3. **Success page loads** → Fetches course details from Stripe session metadata
4. **Displays correct link** → Shows appropriate Telegram bot link for purchased course

### Fallback System
- **Primary**: Gets course type from Stripe session metadata
- **Secondary**: Uses course parameter from URL (`?course=basic`)
- **Tertiary**: Defaults to basic course if all else fails

### Demo Mode Support
Even in demo mode (when Stripe isn't configured), the system will show the correct bot link based on which course button was clicked.

## Testing

### Test Different Courses
1. Click each course button to test the flow
2. Check that the success page shows the correct:
   - Course name
   - Course description  
   - Telegram bot link

### Verify in Browser
Check the URL parameters on the success page:
- `session_id`: Stripe session or demo ID
- `course`: Course type (basic/standard/vip)

## Important Notes

### Bot Setup
- Make sure you have separate Telegram bots for each course tier
- Each bot should provide different content/access levels
- Use unique start parameters to track which course the user purchased

### Security
- The course type is validated on both client and server side
- Stripe session metadata is the primary source of truth for real payments
- URL parameters serve as fallback for demo mode and error cases

### Maintenance
- Update bot links in the `getCourseData` function when needed
- Test the entire flow after making changes
- Consider using environment variables for easier updates in production
