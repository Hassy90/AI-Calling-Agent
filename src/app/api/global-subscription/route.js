const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// GET GLOBAL PRICING
export const getGlobalPricing = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(
      `${BASE_URL}/super_admin/global-pricing`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("GET GLOBAL PRICING ERROR:", error);
    throw error;
  }
};

// UPDATE GLOBAL PRICING
export const updateGlobalPricing = async (payload) => {
  try {
        const token = localStorage.getItem('access_token');

    const response = await fetch(
      `${BASE_URL}/super_admin/global-pricing`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("UPDATE GLOBAL PRICING ERROR:", error);
    throw error;
  }
};