import { apiFetch } from "./api.js";

// Helper function to extract user_id from JWT
function getUserIdFromToken(token) {
  try {
    if (!token) return null;

    // JWT format: header.payload.signature
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;

    // Decode Base64 (URL-safe)
    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
    );
    const payload = JSON.parse(payloadJson);

    // backend sets subject in 'sub' and/or may include 'user_id'
    return payload.sub || payload.user_id || null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export async function loginUser({ username, password }) {
  try {
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    body.append("scope", "");
    body.append("client_id", "string");
    body.append("client_secret", "string");

    const token = localStorage.getItem('access_token');

    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        'ngrok-skip-browser-warning': 'true',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.detail || JSON.stringify(data);
      throw new Error(message);
    }


    if (data.access_token) {
      // Store token
      localStorage.setItem("access_token", data.access_token);

     

      // Store subscription status from backend
      if (typeof data.isSubscribed !== "undefined") {
        localStorage.setItem("isSubscribed", data.isSubscribed.toString());
      } else {
        // Default to false if not provided
        localStorage.setItem("isSubscribed", "false");
      }

      // Store subscription tier
      if (data.subscriptionTier) {
        localStorage.setItem("subscriptionTier", data.subscriptionTier);
      } else {
        localStorage.setItem("subscriptionTier", "free");
      }
    }

   

    return {
      success: true,
      token: data.access_token,
      role: data.role,
      user_id: data.user_id || getUserIdFromToken(data.access_token),
      isSubscribed: data.isSubscribed || false,
      subscriptionTier: data.subscriptionTier || "free",
    };
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return { success: false, error: error.message };
  }
}
