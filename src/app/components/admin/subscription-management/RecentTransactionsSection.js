export default function RecentTransactionsSection({ transactions }) {
  if (transactions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Amount</p>
                <p className="text-lg text-gray-800">
                  {transaction.amount}{' '}
                  <span className="text-lg uppercase">{transaction.currency}</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-gray-900">
                  {new Date(transaction.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.payment_status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : transaction.payment_status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.payment_status === 'paid' ? '✓' : ''}{' '}
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
