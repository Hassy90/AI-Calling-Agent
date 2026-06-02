/**
 * Get all available plans
 */
export async function getPlans() {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plans`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch plans');
    }

    const data = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error('Error fetching plans:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe to a plan
 */
export async function subscribeToPlan(planId) {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        plan_id: planId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to subscribe');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get user's subscription by user_id
 */
export async function getUserSubscriptionById() {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscription`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch subscription');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return { success: false, error: error.message };
  }
}
