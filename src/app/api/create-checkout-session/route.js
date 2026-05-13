const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, user_id, no_of_minutes } = body;

    if (!amount || !user_id) {
      return Response.json({ success: false, error: 'amount and user_id are required' }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, user_id, no_of_minutes }),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
