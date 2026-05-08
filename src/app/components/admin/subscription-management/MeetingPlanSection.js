export default function MeetingPlanSection({
  minutes,
  rate,
  amount,
  processing,
  onProceedToPayment,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Plan</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">You have requested</p>
            <p className="text-lg font-medium">{minutes ?? 0} minutes</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Agreed rate per minute</p>
            <p className="text-lg font-medium">{rate ?? 0} USD</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total amount</p>
            <p className="text-lg font-medium">{amount} USD</p>
          </div>

          <div className="pt-2">
            <button
              onClick={onProceedToPayment}
              disabled={processing}
              className="w-full py-2 rounded-md bg-cyan-600 text-white font-semibold disabled:opacity-50 hover:bg-cyan-700 transition"
            >
              {processing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            You will be redirected to a secure checkout to complete payment.
          </p>
        </div>
      </div>
    </div>
  );
}
