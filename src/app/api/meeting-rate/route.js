const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return Response.json({ success: false, error: 'user_id is required' }, { status: 400 });
    }

    const url = new URL(`${BASE_URL}/api/contact/meeting/rate`);
    url.searchParams.set('user_id', userId);

    const res = await fetch(url.toString(), {
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
