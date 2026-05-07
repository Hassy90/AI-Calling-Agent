'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import CustomToast from '@/app/components/CustomToast';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

// (API calls are inline in this file — reverted to inline fetches)

export default function MeetingRatePage() {
  const [minutes, setMinutes] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => {
    const uid = localStorage.getItem('user_id');
    const mail = localStorage.getItem('email');
    setUserId(uid);
    setEmail(mail);

    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchRate = async () => {
      try {
        setLoading(true);
        const url = new URL(`${BASE_URL}/api/contact/meeting/rate`);
        url.searchParams.set('user_id', uid);

        const res = await fetch(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });

        const data = await res.json();
        if (data && data.success) {
          setMinutes(Number(data.no_of_mins));
          setRate(Number(data.rate_per_minute));
        } else {
          showToast('Failed to fetch meeting rate', 'error');
        }
      } catch (err) {
        console.error('fetchRate error', err);
        showToast('Error fetching meeting rate', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  const amount = (Number(minutes || 0) * Number(rate || 0));

  const handleProceedToPayment = async () => {
    if (!email) {
      showToast('Missing email in localStorage', 'error');
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, email }),
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
      <div className="min-h-screen bg-gradient-to-br  text-gray-800 from-gray-50 to-gray-100 p-4">
        {toast && (
          <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Meeting Plan</h1>
          <p className="text-sm text-gray-600 mt-1">Your assigned meeting minutes and rate.</p>
        </div>

        <div className="max-w-xl bg-white rounded-xl shadow p-6">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
            </div>
          ) : !userId ? (
            <div className="text-sm text-gray-700">Please login to view meeting plan.</div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">You have requested </p>
                <p className="text-2xl font-semibold">{minutes ?? 0} minutes</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Agreed rate per minute</p>
                <p className="text-lg font-medium">{rate ?? 0} USD</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total amount</p>
                <p className="text-lg font-bold">{amount} USD</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleProceedToPayment}
                  disabled={processing}
                  className="w-full py-2 rounded-md bg-cyan-600 text-white font-semibold disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>

              <p className="text-xs text-gray-500">You will be redirected to a secure checkout to complete payment.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
