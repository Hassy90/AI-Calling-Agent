const pricingBreakdown = [
  { label: 'Twilio/Phone', value: 0.82, note: 'Carrier and telephony minutes' },
  { label: 'AI Call Agent', value: 0.27, note: 'Conversation intelligence runtime' },
  { label: 'Platform Fee', value: 0.1, note: 'Infrastructure and support' },
];

const exampleMinutes = [5000, 10000, 20000];

const formatAed = (amount) =>
  `${amount.toLocaleString('en-AE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} AED`;

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-24">
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Prepaid Voice Billing
          </span>
          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            AI Call Agent Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Transparent prepaid pricing at <span className="font-semibold text-cyan-600">1.1 AED per minute</span>,
            with clear cost components for planning and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pricingBreakdown.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-cyan-700">{item.label}</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">{item.value.toFixed(2)} AED</p>
              <p className="mt-2 text-sm text-gray-600">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Example Monthly Pricing</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Minutes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Approx. Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {exampleMinutes.map((minutes) => (
                  <tr key={minutes} className="hover:bg-cyan-50/40">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{minutes.toLocaleString()} minutes</td>
                    <td className="px-6 py-4 text-sm font-semibold text-cyan-700">{formatAed(minutes * 1.1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#quote"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-400/30"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
