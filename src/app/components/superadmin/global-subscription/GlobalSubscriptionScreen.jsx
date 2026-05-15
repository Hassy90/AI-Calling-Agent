"use client";

import { useEffect, useState } from "react";
import {
  getGlobalPricing,
  updateGlobalPricing,
} from "../../../api/global-subscription/route";

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
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Global Subscription Pricing
        </h1>

        <div className="space-y-4 mb-6">

  <div className="border p-4 rounded-lg">
    <p className="text-sm text-gray-500">
      Base Cost Per Minute
    </p>

    <p className="text-xl font-semibold">
      {pricing.base_cost_per_minute} {pricing.currency}
    </p>
  </div>

  <div className="border p-4 rounded-lg">
    <p className="text-sm text-gray-500">
      Custom Voice Price Per Minute
    </p>

    <p className="text-xl font-semibold">
      {pricing.custom_voice_price_per_minute} {pricing.currency}
    </p>
  </div>

  <div className="border p-4 rounded-lg">
    <p className="text-sm text-gray-500">
      New Number Price Per Minute
    </p>

    <p className="text-xl font-semibold">
      {pricing.new_number_price_per_minute} {pricing.currency}
    </p>
  </div>

</div>

        <p className="mt-4 text-sm text-gray-600">
          Currency: {pricing.currency}
        </p>

       <p className="text-sm text-gray-600 mb-6">
         Last Updated:{" "}
         {pricing.updated_at
          ? new Date(pricing.updated_at).toLocaleString()
          : "N/A"}
          </p>

        <button
         onClick={() => setShowModal(true)}
         className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg"
          >
          Edit Pricing
           </button>

           {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Update Pricing
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>

      <Input
        label="Base Cost Per Minute"
        name="base_cost_per_minute"
        value={pricing.base_cost_per_minute}
        onChange={handleChange}
      />

      <Input
        label="Custom Voice Price Per Minute"
        name="custom_voice_price_per_minute"
        value={pricing.custom_voice_price_per_minute}
        onChange={handleChange}
      />

      <Input
        label="New Number Price Per Minute"
        name="new_number_price_per_minute"
        value={pricing.new_number_price_per_minute}
        onChange={handleChange}
      />

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-4"
      >
        {updating ? "Updating..." : "Save Changes"}
      </button>

    </div>
  </div>
)}

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

// reusable input
function Input({ label, ...props }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium">{label}</label>
      <input
        type="number"
        step="0.01"
        className="w-full border p-3 rounded-lg"
        {...props}
      />
    </div>
  );
}