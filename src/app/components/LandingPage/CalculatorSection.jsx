'use client';

import { useMemo, useState } from 'react';

const BASE_RATE = 0.10;

const formatUsd = (amount) =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function CalculatorSection() {
  const [monthlyMinutes, setMonthlyMinutes] = useState(5000);
  const [numberType, setNumberType] = useState('own');
  const [customizeVoice, setCustomizeVoice] = useState(false);

const pricing = useMemo(() => {
  const safeMinutes = Number.isFinite(Number(monthlyMinutes))
    ? Math.max(0, Number(monthlyMinutes))
    : 0;

  // BASE RATE
  const baseRate =
    numberType === 'neurovise'
      ? BASE_RATE + 0.22
      : BASE_RATE;

  // BASE COST
  const baseCost = safeMinutes * baseRate;

  // CUSTOM VOICE RATE
  let voiceRate = 0;

  if (customizeVoice) {
    if (safeMinutes <= 60) {
      voiceRate = 0.20;
    } 
    else if (safeMinutes <= 240) {
      voiceRate = 0.18;
    } 
    else if (safeMinutes >= 241) {
      voiceRate = 0.17;
    } 
    else {
      voiceRate = 0.10;
    }
  }

  // VOICE COST
  const voiceCost = safeMinutes * voiceRate;

  // FINAL RATE
  const finalRate = baseRate + voiceRate;

  // TOTAL MONTHLY COST
  const totalMonthlyCost = baseCost + voiceCost;

  const totalRatePerMinute = finalRate;

  return {
    baseRate,
    baseCost,
    voiceRate,
    voiceCost,
    finalRate,
    totalRatePerMinute,
    totalMonthlyCost,
  };
}, [monthlyMinutes, numberType, customizeVoice]);



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
                    onClick={() => setNumberType('own')}
                    className={`rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition ${
                      numberType === 'own'
                        ? 'border-cyan-500 bg-cyan-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-cyan-400'
                    }`}
                  >
                    Use your existing company number
                  </button>
                  <button
                    type="button"
                    onClick={() => setNumberType('neurovise')}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                      numberType === 'neurovise'
                        ? 'border-cyan-500 bg-cyan-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-cyan-400'
                    }`}
                  >
                    Need a new contact number
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">Phone number charges are billed separately based on your carrier</p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Voice Option</p>
                <div className="grid grid-cols-2 rounded-lg border border-gray-300 bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setCustomizeVoice(false)}
                    className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                      !customizeVoice
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'bg-transparent text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomizeVoice(true)}
                    className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                      customizeVoice
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'bg-transparent text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Customize Voice
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Estimated Monthly Cost</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Base Cost (${pricing.baseRate.toFixed(2)}/min)</span>
                <span className="text-sm font-semibold text-gray-900">{formatUsd(pricing.baseCost)}</span>
              </div>
             {customizeVoice && (
             <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
             <span className="text-sm font-medium text-gray-700">
              Customize Voice (+${pricing.voiceRate.toFixed(2)}/min)
             </span>

             <span className="text-sm font-semibold text-gray-900">
            {formatUsd(pricing.voiceCost)}
              </span>
            </div>
             )}
            </div>

            <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-cyan-700">Total Monthly Cost</p>
                <p className="text-2xl font-bold text-cyan-900">{formatUsd(pricing.totalMonthlyCost)}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const quoteSection = document.getElementById('quote-section');
                if (quoteSection) {
                  // Ensure monthlyMinutes is converted to a number
                  const numMinutes = Number.isFinite(Number(monthlyMinutes)) ? Math.max(0, Number(monthlyMinutes)) : 0;
                  
                  const dataToStore = {
                    monthlyMinutes: numMinutes,
                    customizeVoice,
                    numberType,
                    totalCost: pricing.totalMonthlyCost,
                    totalRatePerMinute: pricing.totalRatePerMinute,
                    timestamp: Date.now(), // Add timestamp to force updates
                  };
                  
                  console.log('📦 Storing calculator data:', dataToStore);
                  sessionStorage.setItem('calculatorData', JSON.stringify(dataToStore));
                  
                  // Trigger custom event for components listening
                  const event = new CustomEvent('calculatorDataUpdated', { detail: dataToStore });
                  window.dispatchEvent(event);
                  
                  console.log('📡 Custom event dispatched');
                  
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:from-cyan-400 hover:to-cyan-500"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
