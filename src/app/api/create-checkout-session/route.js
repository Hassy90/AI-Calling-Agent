const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, no_of_minutes } = body;

    if (!amount) {
      return Response.json({ success: false, error: 'amount is required' }, { status: 400 });
    }

    const authHeader = request.headers.get('authorization');  
    const res = await fetch(
      `${BASE_URL}/api/payments/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: JSON.stringify({
          amount,
          no_of_minutes,
        }),
      }
    );

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
