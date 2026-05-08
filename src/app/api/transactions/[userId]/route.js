const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request, { params }) {
  try {
    // Await params in case it's a promise
    const resolvedParams = await Promise.resolve(params);
    const userId = resolvedParams?.userId;

    if (!userId) {
      return Response.json({ success: false, error: 'userId is required' }, { status: 400 });
    }

    const url = `${BASE_URL}/api/payments/stripe-transactions/${userId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
