# Stripe Payment Setup Guide

## Current Issue
The payment system is currently running in **demo mode** because the Stripe secret key appears to be incomplete or invalid.

## Quick Fix Steps

### 1. Get Your Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign in to your account
3. Navigate to **Developers** → **API Keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_live_` for production or `pk_test_` for testing)
   - **Secret key** (starts with `sk_live_` for production or `sk_test_` for testing)

### 2. Update Environment Variables
Edit your `.env.local` file:

```bash
# Stripe Configuration - Replace with your actual keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_full_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_full_secret_key_here

# App Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_nextauth_secret_here
```

**Important:** 
- Make sure the secret key is complete (should be very long, around 100+ characters)
- Never share your secret key publicly
- For testing, use `pk_test_` and `sk_test_` keys

### 3. Restart Your Development Server
After updating `.env.local`:
```bash
npm run dev
```

### 4. Test the Payment Flow
1. Open your website
2. Click on a payment button
3. Check the browser console for logs
4. You should see either:
   - Real Stripe checkout (if keys are valid)
   - Demo mode with explanation (if keys are invalid)

## For Netlify Deployment

### 1. Set Environment Variables in Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add these variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key_here
   STRIPE_SECRET_KEY = sk_live_your_key_here
   ```

### 2. Redeploy Your Site
After adding the environment variables, trigger a new deployment.

## Testing vs Production

### Test Mode (Recommended for Development)
- Use `pk_test_` and `sk_test_` keys
- No real money is charged
- Use test card numbers from [Stripe Testing](https://stripe.com/docs/testing)

### Production Mode
- Use `pk_live_` and `sk_live_` keys
- Real payments are processed
- Your Stripe account must be fully activated

## Common Test Card Numbers
For testing with `test` keys:
- **Successful payment:** 4242 4242 4242 4242
- **Declined payment:** 4000 0000 0000 0002
- Any future expiry date and any 3-digit CVC

## Troubleshooting

### If payments still don't work:
1. Check browser console for error messages
2. Verify that your Stripe keys are complete and valid
3. Make sure your Stripe account is activated
4. Check that the environment variables are properly set

### Current Demo Mode Behavior:
- Shows an alert explaining it's demo mode
- Redirects to success page for demonstration
- Logs detailed information in the console

### When Live Payments Work:
- Users are redirected to Stripe Checkout
- Real payment processing occurs
- Success page shows after payment completion

## Support
If you continue having issues:
1. Check the browser console for detailed error messages
2. Verify your Stripe dashboard for any account issues
3. Ensure all environment variables are set correctly

The current implementation gracefully falls back to demo mode if there are any issues, so users can still experience the full flow even during setup.
