/**
 * API functions for leads management
 */

// Use the correct base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL  ;

export async function apiFetchLeads(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  // console.log('API Request:', url, options.method || 'GET');
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(options.headers || {}),
      },
      ...options,
    });
    
    // console.log('API Response status:', response.status);
    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

/**
 * Get all leads for a user
 */
export async function getLeads( page = 1, limit = 10) {
  try {

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }
    const response = await apiFetchLeads(`/dynamics/leads?page=${page}&limit=${limit}`
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch leads');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId) {
  try {
    const response = await apiFetchLeads(`/dynamics/leads/${leadId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

/**
 * Add a product prompt to a lead
 */
export async function addPromptToLead(productId, leadId) {
  try {
    const response = await apiFetchLeads(`/dynamics/lead/add-prompt`, {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        lead_id: leadId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add prompt to lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding prompt to lead:', error);
    throw error;
  }
}

/**
 * Get calls by user with date range for CSV export
 */
export async function getCallsByUser(startDate, endDate) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }
    const response = await apiFetchLeads(
      `/api/calls/by-user?start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch calls');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching calls:', error);
    throw error;
  }
}

/**
 * Upload CSV file with leads
 */
export async function uploadLeadsCSV(file) {
  try {

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in again.');
    }

    const formData = new FormData();
    formData.append('file', file);
    
    // Add userId as a query parameter or in the form data if needed
    const url = `${BASE_URL}/dynamics/leads/upload-csv`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to upload CSV');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading CSV:', error);
    throw error;
  }
}
