const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// GET GLOBAL PRICING
export const getGlobalPricing = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/super_admin/global-pricing`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
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
    const response = await fetch(
      `${BASE_URL}/super_admin/global-pricing`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
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