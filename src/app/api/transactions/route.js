const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');

    const res = await fetch(
      `${BASE_URL}/api/payments/stripe-transactions`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
      }
    );

    const data = await res.json();

    return Response.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error('API route error:', error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}