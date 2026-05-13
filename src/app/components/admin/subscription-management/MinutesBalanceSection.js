export default function MinutesBalanceSection({ balance }) {
  if (!balance) {
    return (
      <div className="max-w-xl bg-white rounded-xl shadow p-6">
        <p className="text-sm text-gray-700">Loading minutes balance...</p>
      </div>
    );
  }

  const {
    total_minutes_purchased,
    total_minutes_used,
    remaining_minutes,
    expires_at,
    is_expired,
  } = balance;

  const expiryText = expires_at ? new Date(expires_at).toLocaleString() : '—';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Minutes Summary</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-8">
            <p className="text-sm text-gray-600 mb-2">Purchased</p>
            <p className="text-3xl font-bold text-cyan-700">{total_minutes_purchased ?? 0}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <p className="text-sm text-gray-600 mb-2">Used</p>
            <p className="text-3xl font-bold text-blue-700">{total_minutes_used ?? 0}</p>
          </div>

          <div className={`rounded-lg p-8 border ${Number(remaining_minutes) < 50 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <p className="text-sm text-gray-600 mb-2">Remaining</p>
            <p className={`text-3xl font-bold ${Number(remaining_minutes) < 50 ? 'text-red-700' : 'text-green-700'}`}>
              {remaining_minutes ?? 0}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
            <p className="text-sm text-gray-600 mb-2">Expires At</p>
            <p className="text-lg font-bold text-amber-700">{is_expired ? 'Expired' : expiryText}</p>
          </div>
        </div>

        {Number(remaining_minutes) < 50 && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded">
            <p className="text-sm">Your remaining minutes are low. Please top up soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
