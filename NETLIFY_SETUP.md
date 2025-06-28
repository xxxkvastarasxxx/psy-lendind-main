# Netlify Environment Variables Setup Guide

## Step-by-Step Instructions:

### 1. Access Netlify Dashboard
- Go to: https://app.netlify.com/
- Select your site: "iridescent-pithivier-baf577"

### 2. Navigate to Environment Variables
- Click on "Site settings"
- In the left sidebar, click "Environment variables"

### 3. Add Stripe Keys
Click "Add a variable" for each of these:

**Variable 1:**
- Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Value: Your Stripe publishable key (starts with pk_test_ or pk_live_)

**Variable 2:**
- Key: `STRIPE_SECRET_KEY`
- Value: Your Stripe secret key (starts with sk_test_ or sk_live_)

**Variable 3:**
- Key: `NEXTAUTH_URL`
- Value: `https://iridescent-pithivier-baf577.netlify.app`

### 4. Deploy
- After adding all variables, trigger a new deployment
- Go to "Deploys" tab and click "Trigger deploy"
- Choose "Deploy site"

### 5. Test
- After deployment completes, test the payment buttons
- They should now redirect to real Stripe checkout instead of demo mode

## Important Notes:
- Use TEST keys (pk_test_/sk_test_) for testing
- Use LIVE keys (pk_live_/sk_live_) for production
- Never commit secret keys to your repository
- Test payments won't charge real money
- Live payments will charge real money

## Where to get Stripe keys:
1. Go to https://dashboard.stripe.com/
2. Click "Developers" → "API keys"
3. Toggle between "Test mode" and "Live mode" as needed
4. Copy the Publishable key and Secret key

## Testing Credit Cards (Test mode only):
- Visa: 4242 4242 4242 4242
- Visa (debit): 4000 0566 5566 5556
- Mastercard: 5555 5555 5555 4444
- American Express: 3782 822463 10005
- Use any future expiry date and any 3-digit CVC
