const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { userId } = resolvedParams;
    if (!userId) {
      return Response.json({ success: false, error: 'userId is required' }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/api/balance/${userId}`, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Balance proxy error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
