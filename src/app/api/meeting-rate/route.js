const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const token = localStorage.getItem('access_token');

    const res = await fetch(
      `${BASE_URL}/api/contact/meeting/rate`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}