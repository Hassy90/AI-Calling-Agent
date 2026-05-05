'use client';

import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  email: '',
  date: '',
  time: '09:00',
  timezone: 'Asia/Dubai',
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

export default function QuoteSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [calculatorData, setCalculatorData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load calculator data from sessionStorage
    const storedData = sessionStorage.getItem('calculatorData');
    if (storedData) {
      setCalculatorData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the submission data
    const submissionData = {
      name: formData.name,
      email: formData.email,
      timeslot: {
        date: formData.date,
        time: formData.time,
        timezone: formData.timezone,
      },
      message: formData.message,
      // Include calculator data
      monthlyMinutes: calculatorData?.monthlyMinutes || 0,
      customizeVoice: calculatorData?.customizeVoice || false,
      numberType: calculatorData?.numberType || 'neurovise',
      estimatedMonthlyCost: calculatorData?.totalCost || 0,
    };

    console.log('Quote Submission Data:', submissionData);
    // TODO: Send to endpoint when provided
    // await fetch('/api/quotes', { method: 'POST', body: JSON.stringify(submissionData) })

    setIsSubmitted(true);
    setFormData(initialFormState);
    
    // Reset submitted message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
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
          {/* Calculator Summary */}
          {calculatorData && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white mb-4">Your Configuration</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Monthly Minutes</span>
                  <span className="text-sm font-semibold text-cyan-200">{calculatorData.monthlyMinutes?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Number Type</span>
                  <span className="text-sm font-semibold text-cyan-200">
                    {calculatorData.numberType === 'neurovise' ? 'Neurovise Number' : 'Own Number'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Customize Voice</span>
                  <span className={`text-sm font-semibold ${calculatorData.customizeVoice ? 'text-emerald-200' : 'text-gray-400'}`}>
                    {calculatorData.customizeVoice ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Est. Monthly Cost</span>
                    <span className="text-sm font-bold text-cyan-300">
                      ${calculatorData.totalCost?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quote Form */}
          <form
            onSubmit={handleSubmit}
            className={`${calculatorData ? 'lg:col-span-2' : 'lg:col-span-3'} rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8`}
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
                      {timezone}
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
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-700"
              >
                Submit Quote Request
              </button>
            </div>

            {isSubmitted && (
              <div className="mt-4 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                ✓ Success! Your quote request has been submitted. Our team will reach out shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
