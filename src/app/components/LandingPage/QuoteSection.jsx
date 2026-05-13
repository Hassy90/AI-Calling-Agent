'use client';

import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  email: '',
  date: '',
  time: '09:00',
  timezone: 'America/New_York',
  message: '',
};

const timeOptions = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const timezoneOptions = ['Asia/Dubai', 'UTC', 'Europe/London', 'America/New_York', 'Asia/Kolkata'];

const formatTimezone = (tz) => {
  if (tz === 'UTC') return 'UTC';
  const parts = tz.split('/');
  return parts[1]?.replace(/_/g, ' ') || tz;
};

export default function QuoteSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [calculatorData, setCalculatorData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load calculator data from sessionStorage
    const loadCalculatorData = () => {
      const storedData = sessionStorage.getItem('calculatorData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          
          // Ensure monthlyMinutes is a number
          if (parsedData.monthlyMinutes) {
            parsedData.monthlyMinutes = Number(parsedData.monthlyMinutes);
          }
          
          setCalculatorData(parsedData);
          setError(null); // Clear any previous errors
          // console.log('✅ Calculator data loaded in QuoteSection:', parsedData);
          // console.log('Data types:', {
          //   monthlyMinutes: typeof parsedData.monthlyMinutes,
          //   customizeVoice: typeof parsedData.customizeVoice,
          //   numberType: typeof parsedData.numberType,
          //   totalCost: typeof parsedData.totalCost,
          // });
        } catch (err) {
          console.error('❌ Error parsing calculator data:', err);
          setError('Failed to load calculator data. Please try again.');
        }
      } else {
        // console.log('⚠️ No calculator data found in sessionStorage');
        setCalculatorData(null);
      }
    };

    // Initial load
    loadCalculatorData();

    // Listen for custom calculator update events
    const handleCalculatorUpdate = (e) => {
      // console.log('🔔 Calculator update event received:', e.detail);
      loadCalculatorData();
    };

    // Also listen for standard storage events (for cross-tab compatibility)
    const handleStorageChange = (e) => {
      if (e.key === 'calculatorData') {
        // console.log('🔔 Storage event triggered for calculatorData');
        loadCalculatorData();
      }
    };

    window.addEventListener('calculatorDataUpdated', handleCalculatorUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('calculatorDataUpdated', handleCalculatorUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = async (email) => {
    try {
      const response = await fetch(`/api/email-validation?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          valid: false,
          message: data.error || 'Email validation failed',
        };
      }

      if (!data.is_valid) {
        return {
          valid: false,
          message: data.reason || 'Email validation failed',
        };
      }

      return { valid: true };
    } catch (err) {
      console.error('Email validation error:', err);
      return {
        valid: false,
        message: 'Unable to validate email. Please check your email and try again.',
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate email first
    const emailValidation = await validateEmail(formData.email.trim());
    if (!emailValidation.valid) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    // Validate that we have valid minutes
    const noOfMins = calculatorData?.monthlyMinutes || 0;
    const ratePerMinute = calculatorData?.totalRatePerMinute || 0;
    if (!noOfMins || noOfMins === 0) {
      setError('Please specify the number of monthly minutes needed.');
      setIsLoading(false);
      return;
    }

    // Validate form fields
    if (!formData.name?.trim()) {
      setError('Please enter your name.');
      setIsLoading(false);
      return;
    }

    if (!formData.email?.trim()) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Please select a preferred date.');
      setIsLoading(false);
      return;
    }

    if (!formData.time) {
      setError('Please select a preferred time.');
      setIsLoading(false);
      return;
    }

    try {
      // Combine date and time into ISO datetime string
      const dateTimeString = `${formData.date}T${formData.time}:00`;
      const datetime = new Date(dateTimeString).toISOString();

      // Prepare the submission data according to endpoint schema
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        datetime: datetime,
        message: formData.message?.trim() || '', // Send as string, not array
        no_of_mins: String(noOfMins),
         rate_per_minute: String(ratePerMinute),
      };

      // console.log('📤 Submitting quote request to API:', JSON.stringify(submissionData, null, 2));
      // console.log('💾 Calculator data used:', {
      //   monthlyMinutes: calculatorData.monthlyMinutes,
      //   numberType: calculatorData.numberType,
      //   customizeVoice: calculatorData.customizeVoice,
      //   totalCost: calculatorData.totalCost,
      // });

      // Send to endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/meeting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        
        // Extract detailed error message from API response
        let errorMessage = `API error: ${response.status}`;
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => {
              if (typeof err === 'object' && err.msg) {
                return `${err.loc?.join('.')} - ${err.msg}`;
              }
              return String(err);
            }).join(', ');
          } else {
            errorMessage = String(errorData.detail);
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      // console.log('✅ Quote Submission Success:', result);

      setIsLoading(false);
      setIsSubmitted(true);
      setFormData(initialFormState);

      // Reset submitted message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('❌ Quote Submission Error:', err);
      setError(err.message || 'Failed to submit quote request. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section id="quote-section" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-16 md:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200">
            Contact Sales
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Get a Quote</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Share your details and preferred meeting slot. Our team will prepare a tailored quote.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {!calculatorData && !isLoading && !isSubmitted && (
            <div className="lg:col-span-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 mb-4">
              ⚠ Please use the calculator above to configure your requirements before requesting a quote.
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="lg:col-span-3 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-md">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-cyan-500"></div>
                </div>
                <p className="text-lg font-semibold text-white">Submitting your quote request...</p>
                <p className="mt-2 text-sm text-gray-400">Please wait while we process your information.</p>
              </div>
            </div>
          )}

          {/* Thank You State */}
          {isSubmitted && (
            <div className="lg:col-span-3 flex items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-12 backdrop-blur-md">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="mt-2 text-gray-300">Your quote request has been submitted successfully.</p>
                <p className="mt-1 text-sm text-gray-400">Our team will review your details and reach out shortly.</p>
              </div>
            </div>
          )}

          {/* Quote Form */}
          {!isLoading && !isSubmitted && (
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8"
            >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="block md:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-200">Name *</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="Your full name"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-200">Email *</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="name@company.com"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-200">Preferred Date *</span>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-200">Preferred Time *</span>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-200">Timezone *</span>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                >
                  {timezoneOptions.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {formatTimezone(timezone)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-gray-200">Message (Optional)</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                  placeholder="Any additional details or questions..."
                />
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || !calculatorData}
                className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all ${
                  isLoading || !calculatorData
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
              {!calculatorData && (
                <p className="mt-2 text-xs text-gray-400 text-center">Scroll up and use the calculator to get started</p>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                ✗ {error}
              </div>
            )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
