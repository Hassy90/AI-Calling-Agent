'use client';

import { useState } from 'react';

const initialFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  monthlyMinutes: '',
  phoneNumbers: '',
  country: '',
  message: '',
  date: '',
  time: '09:00',
  timezone: 'Asia/Dubai',
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData(initialFormState);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-16 md:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200">
            Contact Sales
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Get a Quote</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Share your expected usage and preferred meeting slot. Our team will prepare a tailored quote.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:grid-cols-2 md:p-8"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="Your full name"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Company</span>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="Company name"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Email</span>
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

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Phone</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="+971..."
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Monthly Minutes</span>
            <input
              type="number"
              min="0"
              name="monthlyMinutes"
              value={formData.monthlyMinutes}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="5000"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Phone Numbers</span>
            <input
              type="number"
              min="0"
              name="phoneNumbers"
              value={formData.phoneNumbers}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="2"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Country</span>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="United Arab Emirates"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Preferred Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Preferred Time</span>
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

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-200">Timezone</span>
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
            <span className="mb-2 block text-sm font-medium text-gray-200">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
              placeholder="Tell us about your use case and expected rollout timeline."
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-700"
            >
              Submit Request
            </button>
          </div>

          {isSubmitted && (
            <div className="md:col-span-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              Success! Your quote request has been captured. Our team will reach out shortly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
