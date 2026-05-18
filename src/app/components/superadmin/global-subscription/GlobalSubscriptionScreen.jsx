"use client";

import { useEffect, useState } from "react";
import {
  getGlobalPricing,
  updateGlobalPricing,
} from "../../../api/global-subscription/route";

import {
  Phone,
  Mic,
  PhoneCall,
  Pencil,
  Clock3,
  X,
} from "lucide-react";

export default function GlobalSubscriptionScreen() {
  const [pricing, setPricing] = useState({
    base_cost_per_minute: "",
    custom_voice_price_per_minute: "",
    new_number_price_per_minute: "",
    currency: "",
    updated_at: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // FETCH
  useEffect(() => {
    const fetchPricing = async () => {
      setLoading(true);

      try {
        const response = await getGlobalPricing();

        if (response.success) {
          setPricing(response.data);
        }
      } catch (err) {
        console.log(err);
        setMessage("Failed to fetch pricing");
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPricing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleUpdate = async () => {
    setUpdating(true);
    setMessage("");

    try {
      const payload = {
        base_cost_per_minute: Number(pricing.base_cost_per_minute),
        custom_voice_price_per_minute: Number(
          pricing.custom_voice_price_per_minute
        ),
        new_number_price_per_minute: Number(
          pricing.new_number_price_per_minute
        ),
      };

      const response = await updateGlobalPricing(payload);

      if (response) {
        setMessage("Pricing updated successfully");
        setShowModal(false);
      }
    } catch (err) {
      setMessage("Failed to update pricing");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Base Cost",
      value: pricing.base_cost_per_minute,
      icon: Phone,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Custom Voice",
      value: pricing.custom_voice_price_per_minute,
      icon: Mic,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "New Number",
      value: pricing.new_number_price_per_minute,
      icon: PhoneCall,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Global Subscription Pricing
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all pricing plans globally
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 transition text-white px-6 py-3 rounded-xl shadow-md"
          >
            <Pencil size={18} />
            Edit Pricing
          </button>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold text-gray-900 mt-3">
                      {card.value}
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                      {pricing.currency} / minute
                    </p>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.bg}`}
                  >
                    <Icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EXTRA INFO */}
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">

          <div className="flex items-center gap-2 mb-3">
            <Clock3 className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-700">
              Last Updated
            </h3>
          </div>

          <p className="text-gray-600">
            {pricing.updated_at
              ? new Date(pricing.updated_at).toLocaleString()
              : "N/A"}
          </p>

          <p className="text-gray-500 mt-2">
            Currency: {pricing.currency}
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mt-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        {/* MODAL */}
        {/* MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    />

    {/* MODAL BOX */}
    <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6 text-white">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Update Pricing
            </h2>

            <p className="text-blue-100 mt-2 text-sm">
              Modify global subscription pricing values
            </p>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 text-gray-800">

        <div className="space-y-5">

          {/* INPUT CARD */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <Input
              label="Base Cost Per Minute"
              name="base_cost_per_minute"
              value={pricing.base_cost_per_minute}
              onChange={handleChange}
            />
          </div>

          {/* INPUT CARD */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <Input
              label="Custom Voice Price Per Minute"
              name="custom_voice_price_per_minute"
              value={pricing.custom_voice_price_per_minute}
              onChange={handleChange}
            />
          </div>

          {/* INPUT CARD */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <Input
              label="New Number Price Per Minute"
              name="new_number_price_per_minute"
              value={pricing.new_number_price_per_minute}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">

          <button
            onClick={() => setShowModal(false)}
            className="w-full py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 hover:opacity-90 transition text-white font-semibold shadow-lg"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

// REUSABLE INPUT
function Input({ label, ...props }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="number"
        step="0.01"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl transition"
        {...props}
      />
    </div>
  );
}