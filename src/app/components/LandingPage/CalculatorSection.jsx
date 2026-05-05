'use client';

import { useMemo, useState } from 'react';

const BASE_RATE = 0.10;
const VOICE_CUSTOMIZATION_RATE = 0.05;

const formatUsd = (amount) =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function CalculatorSection() {
  const [monthlyMinutes, setMonthlyMinutes] = useState(5000);
  const [numberType, setNumberType] = useState('neurovise');
  const [customizeVoice, setCustomizeVoice] = useState(false);

  const pricing = useMemo(() => {
    const safeMinutes = Number.isFinite(Number(monthlyMinutes)) ? Math.max(0, Number(monthlyMinutes)) : 0;

    const baseCost = safeMinutes * BASE_RATE;
    const voiceCost = customizeVoice ? safeMinutes * VOICE_CUSTOMIZATION_RATE : 0;
    const totalMonthlyCost = baseCost + voiceCost;

    return { baseCost, voiceCost, totalMonthlyCost };
  }, [monthlyMinutes, customizeVoice]);

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
                    Provided by Neurovise Number
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
                    Use Your Own Number
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">Phone number charges are billed separately based on your carrier</p>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={customizeVoice}
                  onChange={(e) => setCustomizeVoice(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-cyan-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Need Customize Voice ? </span>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Estimated Monthly Cost</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Base Cost (${BASE_RATE}/min)</span>
                <span className="text-sm font-semibold text-gray-900">{formatUsd(pricing.baseCost)}</span>
              </div>
              {customizeVoice && (
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">Customize Voice (${VOICE_CUSTOMIZATION_RATE}/min)</span>
                  <span className="text-sm font-semibold text-gray-900">{formatUsd(pricing.voiceCost)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-4 text-white shadow-lg">
              <p className="text-sm">Total Monthly Cost</p>
              <p className="mt-1 text-2xl font-bold">{formatUsd(pricing.totalMonthlyCost)}</p>
            </div>

            <button
              onClick={() => {
                const quoteSection = document.getElementById('quote-section');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                  // Store data in sessionStorage to pass to QuoteSection
                  sessionStorage.setItem(
                    'calculatorData',
                    JSON.stringify({
                      monthlyMinutes,
                      customizeVoice,
                      numberType,
                      totalCost: pricing.totalMonthlyCost,
                    })
                  );
                }
              }}
              className="mt-4 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-cyan-600 transition hover:bg-gray-50"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
