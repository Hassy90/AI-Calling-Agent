'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import CustomToast from '@/app/components/CustomToast';
import MeetingPlanSection from '@/app/components/admin/subscription-management/MeetingPlanSection';
import MinutesBalanceSection from '@/app/components/admin/subscription-management/MinutesBalanceSection';
import RecentTransactionsSection from '@/app/components/admin/subscription-management/RecentTransactionsSection';

// API calls go through Next.js routes to bypass CORS issues

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function MeetingRatePage() {
  const [minutes, setMinutes] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [showMeetingPlan, setShowMeetingPlan] = useState(false);
  // const [email, setEmail] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    

    const fetchRate = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/meeting-rate`, {
          method: 'GET',
          headers: { accept: 'application/json',
              Authorization: `Bearer ${token}`
           },
        });

        const data = await res.json();
        if (data && data.success) {
          setMinutes(Number(data.no_of_mins));
          setRate(Number(data.rate_per_minute));
        } else {
          showToast('Could not fetch meeting rate', 'info');
        }
      } catch (err) {
        console.error('fetchRate error', err);
        showToast('Could not fetch meeting rate', 'info');
      }

      // Also fetch transactions (always)
      try {
        const res = await fetch(`/api/transactions`, {
          method: 'GET',
          headers: { accept: 'application/json',
              Authorization: `Bearer ${token}`
           },
        });

        const data = await res.json();
        if (data && data.success && data.transactions && data.transactions.length > 0) {
          setTransactions(data.transactions);
        }
      } catch (err) {
        console.error('fetchTransactions error', err);
      } finally {
        setLoading(false);
      }

      // Fetch minutes balance
      try {
        const res = await fetch(`${BASE_URL}/api/balance`, {
          method: 'GET',
          headers: { accept: 'application/json',
              Authorization: `Bearer ${token}`
           },
        });

        const data = await res.json();
        if (data && data.success && data.data) {
          setBalance(data.data);
        }
      } catch (err) {
        console.error('fetchBalance error', err);
      }
    };

    fetchRate();
  }, []);

  const amount = (Number(minutes || 0) * Number(rate || 0));

  const handleProceedToPayment = async () => {
    setProcessing(true);
    try {

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      const res = await fetch(`/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
          body: JSON.stringify({
        amount,
        no_of_minutes: String(minutes ?? 0),
      }),
    });

      const data = await res.json();
      if (data && data.success && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        showToast('Failed to create checkout session', 'error');
      }
    } catch (err) {
      console.error('create checkout error', err);
      showToast('Error creating checkout session', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br text-gray-800 from-gray-50 to-gray-100 p-7">
        {toast && (
          <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-sm text-gray-600 mt-1">Your meeting plan and payment history.</p>
        </div>

        {balance && balance.remaining_minutes <= 50 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Your remaining minutes are low. Please top up soon.</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
          </div>
        ) : !localStorage.getItem('access_token') ? (
       <div className="max-w-xl bg-white rounded-xl shadow p-6">
       <p className="text-sm text-gray-700">
      Please login to view your subscription information.
      </p>
      </div>
        ) : (
          <div className="space-y-6">
            {/* Minutes Summary / Meeting Plan Toggle Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {showMeetingPlan ? '' : ''}
                </h2>
                <button
                  onClick={() => setShowMeetingPlan(!showMeetingPlan)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    showMeetingPlan
                      ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {showMeetingPlan ? 'Back to Summary' : 'Show Meeting Plan'}
                </button>
              </div>

              {!showMeetingPlan ? (
                <MinutesBalanceSection balance={balance} />
              ) : (
                <MeetingPlanSection
                  minutes={minutes}
                  rate={rate}
                  amount={amount}
                  processing={processing}
                  onProceedToPayment={handleProceedToPayment}
                />
              )}
            </div>

            {/* Recent Transactions Section */}
            <RecentTransactionsSection transactions={transactions} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
