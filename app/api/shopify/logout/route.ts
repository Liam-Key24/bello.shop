import { NextRequest, NextResponse } from 'next/server';
import { customerLogout } from '@/lib/shopify/customer';

export async function POST(req: NextRequest) {
  try {
    // Read token from HTTP-only cookie
    const token = req.cookies.get('shopifyCustomerToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    // Logout from Shopify
    const result = await customerLogout(token);

    if (result.userErrors?.length) {
      return NextResponse.json(
        { error: result.userErrors[0].message },
        { status: 400 }
      );
    }

    // Clear the cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: 'shopifyCustomerToken',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
    });

    return res;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    console.error('Logout error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
