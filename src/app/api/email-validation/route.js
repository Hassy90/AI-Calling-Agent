const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return Response.json(
        { success: false, error: 'email parameter is required' },
        { status: 400 }
      );
    }

    if (!ABSTRACT_API_KEY) {
      console.error('ABSTRACT_API_KEY is not configured');
      return Response.json(
        { success: false, error: 'Email validation service is not configured' },
        { status: 500 }
      );
    }

    // Call Abstract Email Reputation API
    const response = await fetch(
      `https://emailreputation.abstractapi.com/v1/?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ABSTRACT_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Abstract API error:', response.status);
      return Response.json(
        { success: false, error: 'Failed to validate email' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract validation data
    const deliverability = data.email_deliverability || {};
    const quality = data.email_quality || {};
    const risk = data.email_risk || {};

    // Check validation rules
    const isFormatValid = deliverability.is_format_valid !== false;
    const isDeliverable = deliverability.status === 'deliverable';
    const isNotDisposable = quality.is_disposable !== true;
    const isNotHighRisk = risk.address_risk_status !== 'high';

    const isValid =
      isFormatValid &&
      isDeliverable &&
      isNotDisposable &&
      isNotHighRisk;

    // Determine detailed reason if invalid
    let invalidReason = null;
    if (!isFormatValid) {
      invalidReason = 'Email format is invalid';
    } else if (!isDeliverable) {
      invalidReason = `Email is not deliverable (${deliverability.status_detail || 'unknown reason'})`;
    } else if (!isNotDisposable) {
      invalidReason = 'Disposable email addresses are not allowed';
    } else if (!isNotHighRisk) {
      invalidReason = 'Email address has a high risk flag';
    }

    return Response.json({
      success: true,
      is_valid: isValid,
      reason: invalidReason,
      details: {
        format_valid: isFormatValid,
        deliverable: isDeliverable,
        not_disposable: isNotDisposable,
        not_high_risk: isNotHighRisk,
      },
    });
  } catch (error) {
    console.error('Email validation error:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to validate email' },
      { status: 500 }
    );
  }
}

