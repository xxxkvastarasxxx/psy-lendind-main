# Payment Failure Handling Guide

## Overview
The website now has comprehensive payment failure handling for different scenarios when payments don't complete successfully.

## Payment Failure Scenarios

### 1. **User Cancellation** (`reason=canceled`)
- **What happens**: User clicks "Back" or closes Stripe checkout
- **Stripe redirect**: `/payment-failed?reason=canceled&course=vip`
- **User sees**: Friendly message explaining they canceled the payment
- **Actions available**: "Try Again" button, "Back to Home" button

### 2. **Payment Declined** (`reason=failed`)
- **What happens**: Bank declines the card, insufficient funds, etc.
- **Detection**: Stripe session shows `payment_status: 'unpaid'`
- **User sees**: Error message with troubleshooting tips
- **Actions available**: Retry payment, contact support

### 3. **Session Expired** (`reason=expired`)
- **What happens**: User took too long to complete payment
- **Detection**: Stripe session shows `status: 'expired'`
- **User sees**: Message about timeout with restart instructions
- **Actions available**: Start new payment process

### 4. **Technical Errors** (`reason=error`)
- **What happens**: Network issues, API failures, etc.
- **User sees**: Generic technical error message
- **Actions available**: Retry, contact support

## User Experience Flow

### When Payment Fails:
```
1. User at Stripe Checkout
   ↓
2. Payment fails/canceled
   ↓
3. Redirect to `/payment-failed?reason=X&course=Y`
   ↓
4. Show appropriate error message
   ↓
5. Provide clear next steps
```

### What Users See:

#### Canceled Payment:
- 🟡 **Amber warning icon**
- **Title**: "Оплата была отменена"
- **Message**: Reassuring explanation that cancellation is okay
- **Course info**: Shows which course they tried to purchase
- **Action**: "Попробовать еще раз" button

#### Failed Payment:
- 🔴 **Red error icon**
- **Title**: "Оплата не прошла"
- **Message**: Explains possible reasons for failure
- **Troubleshooting tips**: Card verification, sufficient funds, etc.
- **Action**: Retry payment option

#### Expired Session:
- 🟠 **Orange refresh icon**
- **Title**: "Сессия оплаты истекла"
- **Message**: Explains timeout occurred
- **Action**: Start new payment process

## Technical Implementation

### Payment Failed Page (`/app/payment-failed/page.tsx`)
- **Dynamic content** based on failure reason
- **Course information** display
- **Troubleshooting guidance**
- **Multiple action buttons**
- **Support contact information**

### URL Parameters:
- `reason`: Type of failure (canceled/failed/expired/error)
- `course`: Course type (basic/standard/vip)
- `session_id`: Stripe session ID (optional)

### API Integration:
The `/api/session-details` endpoint now detects failed payments:
```typescript
if (session.payment_status === 'unpaid' || session.status === 'expired') {
  return { mode: 'failed', reason: 'expired', ... }
}
```

### Automatic Redirects:
- **Success page** redirects to payment-failed if it detects a failed session
- **Main page** redirects canceled payments to payment-failed page

## Customization

### Update Failure Messages:
Edit the `getFailureDetails` function in `/app/payment-failed/page.tsx`:

```typescript
const getFailureDetails = (reason: string) => {
  switch (reason) {
    case 'canceled':
      return {
        title: 'Your custom title',
        message: 'Your custom message',
        // ...
      };
  }
};
```

### Add New Failure Types:
1. Add new case to `getFailureDetails` function
2. Update URL parameter handling
3. Add appropriate icon and styling

### Support Contact:
Update the support email in the payment failed page:
```typescript
<a href="mailto:your-support@email.com">
  your-support@email.com
</a>
```

## User Guidance Features

### Troubleshooting Tips:
- Check card details
- Verify sufficient funds
- Try different card
- Contact bank support

### Clear Actions:
- **Primary**: "Попробовать еще раз" (Try Again) - Links back to pricing
- **Secondary**: "Вернуться на главную" (Back to Home)
- **Support**: Direct email link for help

### Visual Design:
- **Color-coded icons** for different failure types
- **Consistent branding** with main site
- **Mobile responsive** design
- **Clear typography** for readability

## Benefits

### For Users:
- ✅ **Clear understanding** of what went wrong
- ✅ **Guided next steps** to resolve issues
- ✅ **Professional experience** even when things fail
- ✅ **Easy retry process** without starting over

### For Business:
- ✅ **Reduced abandoned payments** through clear retry paths
- ✅ **Better customer support** with detailed error context
- ✅ **Professional brand image** with proper error handling
- ✅ **Analytics data** on payment failure reasons

### For Development:
- ✅ **Comprehensive error handling** for all scenarios
- ✅ **Debugging information** with session IDs
- ✅ **Scalable system** for adding new failure types
- ✅ **User-friendly fallbacks** when APIs fail

This creates a complete, professional payment experience that handles failures gracefully and keeps users engaged rather than losing them to frustration.
