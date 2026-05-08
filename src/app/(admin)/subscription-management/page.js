'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import CustomToast from '@/app/components/CustomToast';
import MeetingPlanSection from '@/app/components/admin/subscription-management/MeetingPlanSection';
import RecentTransactionsSection from '@/app/components/admin/subscription-management/RecentTransactionsSection';

// API calls go through Next.js routes to bypass CORS issues

export default function MeetingRatePage() {
  const [minutes, setMinutes] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  // const [email, setEmail] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    const uid = localStorage.getItem('user_id');
    // const mail = localStorage.getItem('email');
    setUserId(uid);
    // setEmail(mail);

    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchRate = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/meeting-rate?user_id=${uid}`, {
          method: 'GET',
          headers: { accept: 'application/json' },
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
        const res = await fetch(`/api/transactions/${uid}`, {
          method: 'GET',
          headers: { accept: 'application/json' },
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
    };

    fetchRate();
  }, []);

  const amount = (Number(minutes || 0) * Number(rate || 0));

  const handleProceedToPayment = async () => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, user_id: userId }),
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

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
          </div>
        ) : !userId ? (
          <div className="max-w-xl bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-700">Please login to view your subscription information.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Meeting Plan Section */}
            <MeetingPlanSection
              minutes={minutes}
              rate={rate}
              amount={amount}
              processing={processing}
              onProceedToPayment={handleProceedToPayment}
            />

            {/* Payment History Section */}
            <RecentTransactionsSection transactions={transactions} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
