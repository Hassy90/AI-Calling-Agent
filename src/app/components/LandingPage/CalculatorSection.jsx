'use client';

import { useMemo, useState } from 'react';

const AGENT_RATE = 0.27;
const PLATFORM_RATE = 0.1;

const formatAed = (amount) =>
  `${amount.toLocaleString('en-AE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} AED`;

export default function CalculatorSection() {
  const [monthlyMinutes, setMonthlyMinutes] = useState(5000);
  const [phoneNumbers, setPhoneNumbers] = useState(2);
  const [numberType, setNumberType] = useState('neurovise');

  const pricing = useMemo(() => {
    const safeMinutes = Number.isFinite(Number(monthlyMinutes)) ? Math.max(0, Number(monthlyMinutes)) : 0;
    const safeNumbers = Number.isFinite(Number(phoneNumbers)) ? Math.max(0, Number(phoneNumbers)) : 0;

    const twilioRate = numberType === 'neurovise' ? 0.82 : 0.72;
    const phoneNumberFee = numberType === 'neurovise' ? safeNumbers * 8 : safeNumbers * 3;

    const twilioCost = safeMinutes * twilioRate + phoneNumberFee;
    const agentCost = safeMinutes * AGENT_RATE;
    const platformFee = safeMinutes * PLATFORM_RATE;
    const totalMonthlyCost = twilioCost + agentCost + platformFee;

    return { twilioCost, agentCost, platformFee, totalMonthlyCost };
  }, [monthlyMinutes, phoneNumbers, numberType]);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Cost Estimator
          </span>
          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">Monthly Cost Calculator</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Estimate your monthly spend instantly with simple dummy logic. No API calls required.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-cyan-50/30 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Usage Inputs</h3>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Monthly Minutes</span>
                <input
                  type="number"
                  min="0"
                  value={monthlyMinutes}
                  onChange={(e) => setMonthlyMinutes(e.target.value)}
                  className="w-full rounded-lg border text-gray-700 border-gray-300 px-4 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Phone Numbers</span>
                <input
                  type="number"
                  min="0"
                  value={phoneNumbers}
                  onChange={(e) => setPhoneNumbers(e.target.value)}
                  className="w-full rounded-lg border text-gray-700 border-gray-300 px-4 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </label>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Number Type</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setNumberType('neurovise')}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                      numberType === 'neurovise'
                        ? 'border-cyan-500 bg-cyan-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-cyan-400'
                    }`}
                  >
                    Use Neurovise Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setNumberType('own')}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                      numberType === 'own'
                        ? 'border-cyan-500 bg-cyan-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-cyan-400'
                    }`}
                  >
                    Use Own Number
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Estimated Monthly Cost</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Twilio Cost</span>
                <span className="text-sm font-semibold text-gray-900">{formatAed(pricing.twilioCost)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Agent Cost</span>
                <span className="text-sm font-semibold text-gray-900">{formatAed(pricing.agentCost)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Platform Fee</span>
                <span className="text-sm font-semibold text-gray-900">{formatAed(pricing.platformFee)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-4 text-white shadow-lg">
              <p className="text-sm">Total Monthly Cost</p>
              <p className="mt-1 text-2xl font-bold">{formatAed(pricing.totalMonthlyCost)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
