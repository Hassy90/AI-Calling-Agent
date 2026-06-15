"use client";

import React, { useState } from "react";
import {
  Phone,
  DollarSign,
  Clock3,
  TrendingUp,
  BarChart3,
  Bot,
  User,
} from "lucide-react";
import { u } from "framer-motion/client";

export default function SavingsSection() {

  const [showCalculator, setShowCalculator] = useState(false);
const [humanSupportCount, setHumanSupportCount] = useState("");

const supportCount = Number(humanSupportCount) || 1;

const humanCost = 3000 * supportCount;

const aiMultiplier = Math.ceil(supportCount / 5);

const aiCost = 960 * aiMultiplier;

const savings = humanCost - aiCost;



const handleContactSales = () => {
  const contactSection = document.getElementById("contactus");

  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  const features = [
    {
      icon: Phone,
      title: "No Missed Calls",
      desc: "Answer every call instantly, even after hours.",
    },
    {
      icon: DollarSign,
      title: "Lower Operating Cost",
      desc: "No salaries, no overtime, no hidden HR costs.",
    },
    {
      icon: Clock3,
      title: "24/7 Availability",
      desc: "Your business stays open, even while you sleep.",
    },
    {
      icon: TrendingUp,
      title: "Scale Without Limits",
      desc: "Handle more calls without hiring more people.",
    },
    {
      icon: BarChart3,
      title: "Better Customer Experience",
      desc: "Fast, consistent and professional conversations.",
    },
  ];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">

        {/* TOP BOX */}
        <div className="border border-gray-200 rounded-3xl bg-[#fafafa] p-4 md:p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.9fr_0.8fr_30px_0.8fr_30px_0.95fr_1fr] gap-4 items-center">

            {/* Left Content */}
            <div>
              <h2 className="text-[22px] md:text-[24px] leading-tight font-bold text-[#0F172A]">
                See How
                <br />
                Much You Save
              </h2>

              <p className="text-gray-600 text-[15px] md:text-[16px] mt-3 leading-7">
                Compare the cost of a human
                receptionist vs AI Call Agent.
              </p>
            </div>

            {/* Human */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 md:px-8 py-6 md:py-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Human Receptionist
                  </p>

                  <p className="text-xs text-gray-500">
                    (Estimated)
                  </p>
                </div>
              </div>

              <h3 className="text-[40px] md:text-5xl font-bold text-black">
                ${humanCost.toLocaleString()}
              </h3>

              <p className="text-gray-600 mt-2 text-lg">
                / month
              </p>
            </div>

            {/* Minus */}
            <div className="hidden lg:flex justify-center text-4xl font-light text-gray-600">
              -
            </div>

            {/* AI */}
            <div className="bg-white border border-gray-200 rounded-2xl px-8 py-7 ">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Bot size={20} className="text-blue-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    AI Call Agent
                  </p>

                  <p className="text-xs text-gray-500">
                    (3,000 minutes plan)
                  </p>
                </div>
              </div>

              <h3 className="text-[40px] md:text-5xl font-bold text-black">
                  ${aiCost.toLocaleString()}
              </h3>

             <p className="text-gray-600 mt-2 text-base md:text-lg">
                / month
              </p>
            </div>

            {/* Equal */}
            <div className="hidden lg:flex justify-center text-4xl font-light text-gray-600">
              =
            </div>

            {/* Savings */}
            <div className="border-2 border-green-500 rounded-2xl bg-[#F7FFF8] p-5 md:p-6 flex flex-col justify-center">

              <p className="text-green-700 font-semibold text-base md:text-lg text-center">
                Estimated Monthly Savings
              </p>

              <h3 className="text-[30px] md:text-[34px] leading-none font-bold text-green-600 text-center mt-4">
                ${savings.toLocaleString()}
              </h3>

              <p className="text-green-700 font-semibold text-lg md:text-xl text-center mt-2">
                per month
              </p>
            </div>

            {/* Right Text */}
            <div>
              <p className="text-gray-700 text-[16px] md:text-[18px] leading-7 md:leading-8">
                A human receptionist may cost
                <span className="font-semibold">
                  {" "}
                  $3,000 to $5,000{" "}
                </span>
                per month and still cannot answer every call after
                hours. Neurovise AI Call Agent works 24/7 and costs
                only when it's actually speaking with customers.
              </p>
            </div>

          </div>
        </div>

        {/* FEATURES BOX */}
        <div className="border border-gray-200 rounded-3xl mt-8 px-5 md:px-8 py-6 md:py-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon
                      size={24}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-[18px] md:text-[20px] text-gray-900">
                      {item.title}
                    </h4>

                    <p className="text-gray-600 mt-2 leading-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>




        {/* BOTTOM CTA */}
<div className="mt-8">
  <div className="bg-[linear-gradient(90deg,#071843_0%,#0A2A72_50%,#071843_100%)] border border-white/10 rounded-[20px] px-6 md:px-10 py-5 md:py-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">

    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-[#1E73FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div>
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Ready to get started?
          </h3>

          <p className="text-[#C8D7FF] text-sm md:text-base mt-1">
            Book a demo and see how our AI Call Agent can grow your business.
          </p>
        </div>
      </div>

     {!showCalculator ? (
  <>
    <button
      onClick={handleContactSales}
      className="lg:ml-auto bg-[#1565FF] hover:bg-[#0D57E7] text-white font-semibold px-8 py-3 rounded-xl whitespace-nowrap"
    >
      Book a Demo
    </button>

    <button
      onClick={() => setShowCalculator(true)}
      className="border border-white/25 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold whitespace-nowrap"
    >
      Calculate My Savings
    </button>
  </>
) : (
  <div className="flex items-center gap-3 w-full">
    <input
      type="number"
      min="1"
      value={humanSupportCount}
      onChange={(e) => setHumanSupportCount(e.target.value)}
      placeholder="Enter your selected number of human support"
      className="flex-1 h-[52px] rounded-xl px-4 text-black bg-white outline-none"
    />

    <button
      onClick={() => {
        setShowCalculator(false);
        setHumanSupportCount("");
      }}
      className="h-[52px] w-[52px] rounded-xl border border-white/25 text-white hover:bg-white/10 text-xl font-bold"
    >
      ✕
    </button>
  </div>
)}

    </div>
  </div>
</div>

      </div>
    </section>
  );
}