"use client";
import React from "react";

import { Phone, Check, Tag } from "lucide-react";


export default function PriceSection() {

const handlePlanSelect = (minutes, price, planName) => {
  const ratePerMinute = (price / minutes).toFixed(4);

  const planData = {
    planName,
    monthlyMinutes: minutes,
    ratePerMinute,
    price,
  };

  sessionStorage.setItem(
    "calculatorData",
    JSON.stringify(planData)
  );

  window.dispatchEvent(
    new Event("calculatorDataUpdated")
  );

  const quoteSection = document.getElementById("quote");
  if (quoteSection) {
    quoteSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const handleContactSales = () => {
  const contactSection = document.getElementById("contactus");

  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-[30px] sm:text-[34px] lg:text-[38px] leading-tight lg:leading-[52px] font-bold text-[#0F172A]">
            Simple, Transparent Pricing
          </h2>

          <p className="text-[16px] sm:text-[20px] lg:text-[24px] text-gray-500 mt-2">
            Choose the option that works best for your business.
          </p>
        </div>

        {/* Top Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">

          {/* Left Card */}
          <div className="border border-[#D8F1E5] rounded-[24px] p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">

               <div className="flex justify-center md:justify-start">
              <div className="w-24 h-24 rounded-full bg-[#EDF9F2] flex items-center justify-center">
                <Phone
                  size={42}
                  className="text-[#16A34A]"
                />
              </div>
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#111827]">
                  1. Bring Your Own Number
                </h3>

                <div className="mt-2">
                  <span className="text-[58px] leading-none font-bold text-[#16A34A]">
                    $0.10
                  </span>
                  <span className="text-[36px] font-semibold text-[#16A34A]">
                    /min
                  </span>
                </div>

                <p className="mt-3 text-[20px] text-[#4B5563] leading-8">
                  Use your existing phone number, PBX, SIP,
                  <br />
                  or Twilio account.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {[
                "AI call handling",
                "Lead capture & qualification",
                "Appointment booking",
                "Call transcript & summary",
                "Basic reporting",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <Check
                    size={18}
                    className="text-[#16A34A]"
                  />
                  <span className="text-[18px] text-[#374151]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="border border-[#DCE7FF] rounded-[24px] p-5 sm:p-6 lg:p-10">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">

                <div className="flex justify-center lg:justify-start">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <Phone
                  size={32}
                  className="text-[#2563EB]"
                />
              </div>
              </div>

              <div>
                <h3 className="text-[20px] lg:text-[22px] font-bold text-[#111827]">
                  2. Fully Managed Calling
                </h3>

                <div className="mt-2">
                  <span className="text-[42px] sm:text-[50px] lg:text-[58px] leading-none font-bold text-[#2563EB]">
                    $0.32
                  </span>
                  <span className="text-[24px] sm:text-[30px] lg:text-[36px] font-semibold text-[#2563EB]">
                    /min
                  </span>
                </div>

                <p className="mt-3 text-[16px] sm:text-[18px] lg:text-[20px] text-[#4B5563] leading-8">
                  We take care of your phone number and
                  <br />
                  telephony setup end to end.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-[18px] font-medium mb-4 text-[#374151]">
                Includes everything in Bring Your Own Number, plus:
              </p>

              <div className="space-y-3">
                {[
                  "Phone number setup",
                  "Telephony routing & connectivity",
                  "AI agent deployment & monitoring",
                  "Provider management",
                  "Priority support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <Check
                      size={18}
                      className="text-[#2563EB]"
                    />
                    <span className="text-[16px] lg:text-[18px] text-[#374151]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-4 items-start">

  {/* Left Side */}
  <div>
    <h3 className="text-[20px] lg:text-[22px] leading-[30px] font-bold text-[#111827]">
      Choose a Plan That
      <br />
      Fits Your Call Volume
    </h3>

    <p className="mt-3 text-[14px] leading-6 text-[#6B7280]">
      All plans include AI Call Agent,
      lead capture, appointment booking,
      call summaries, and reporting.
    </p>

    <div className="mt-5 border border-[#E5E7EB] rounded-xl p-3 flex gap-3 items-center">
      <Tag size={18} className="text-[#17B26A]" />

      <p className="text-[13px] leading-5 text-[#6B7280]">
        Additional minutes are charged
        based on your selected plan.
      </p>
    </div>
  </div>

  {/* Plans */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

    {/* Starter */}
     <div className="border border-[#E5E7EB] rounded-2xl p-4 text-center bg-white flex flex-col">
      <h4 className="text-[18px] font-bold text-[#0EA5A4]">
        Starter
      </h4>

      <p className="text-[12px] text-[#6B7280] mt-1">
        For small businesses
      </p>

      <div className="mt-4">
        <div className="text-[30px] font-bold text-[#111827]">
          1,000
        </div>

        <div className="text-[13px] text-[#6B7280]">
          minutes
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="text-[34px] font-bold text-[#0EA5A4]">
        $299
      </div>

      <div className="text-[13px] text-[#6B7280]">
        / month
      </div>
      <div className="flex-1"></div>
      <button onClick={()=> handlePlanSelect(
        1000,
         299,
      "Starter"
      )}
      className="mt-4 w-full h-[42px] border border-[#0EA5A4] text-[#0EA5A4] rounded-lg text-[14px] font-semibold hover:bg-[#0EA5A4] hover:text-white transition">
       
        Get Started
        
      </button>
    </div>

    {/* Growth */}
    <div className="border border-[#E5E7EB] rounded-2xl p-4 text-center bg-white relative flex flex-col">

      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[10px] px-3 py-1 rounded-full font-semibold whitespace-nowrap">
        MOST POPULAR
      </div>

      <h4 className="text-[18px] font-bold text-[#2563EB]">
        Growth
      </h4>

      <p className="text-[12px] text-[#6B7280] mt-1">
        For growing businesses
      </p>

      <div className="mt-4">
        <div className="text-[30px] font-bold text-[#111827]">
          3,000
        </div>

        <div className="text-[13px] text-[#6B7280]">
          minutes
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="text-[34px] font-bold text-[#2563EB]">
        $799
      </div>

      <div className="text-[13px] text-[#6B7280]">
        / month
      </div>
      <div className="flex-1"></div>
      <button onClick={()=> handlePlanSelect(
        3000,
         799,
      "Growth"
      )}
      className="mt-4 w-full h-[42px] border border-[#2563EB] text-[#2563EB] rounded-lg text-[14px] font-semibold hover:bg-[#2563EB] hover:text-white transition">
        
          Get Started
        
      </button>
    </div>

    {/* Pro */}
    <div className="border border-[#E5E7EB] rounded-2xl p-4 text-center bg-white flex flex-col">
      <h4 className="text-[18px] font-bold text-[#9333EA]">
        Pro
      </h4>

      <p className="text-[12px] text-[#6B7280] mt-1">
        For high call volume
      </p>

      <div className="mt-4">
        <div className="text-[30px] font-bold text-[#111827]">
          6,000
        </div>

        <div className="text-[13px] text-[#6B7280]">
          minutes
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="text-[34px] font-bold text-[#9333EA]">
        $1,499
      </div>

      <div className="text-[13px] text-[#6B7280]">
        / month
      </div>
          <div className="flex-1"></div>
      <button onClick={()=> handlePlanSelect(
        6000,
         1499,
      "Pro"
      )}
      className="mt-4 w-full h-[42px] border border-[#9333EA] text-[#9333EA] rounded-lg text-[14px] font-semibold hover:bg-[#9333EA] hover:text-white transition">
        
          Get Started
        
      </button>
    </div>

    {/* Enterprise */}
    <div className="border border-[#E5E7EB] rounded-2xl p-4 text-center bg-white flex flex-col">
      <h4 className="text-[18px] font-bold text-[#111827]">
        Enterprise
      </h4>

      <p className="text-[12px] text-[#6B7280] mt-1">
        For custom needs
      </p>

      <div className="mt-4">
        <div className="text-[28px] font-bold text-[#111827]">
          Custom
        </div>

        <div className="text-[13px] text-[#6B7280]">
          minutes
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="text-[28px] font-bold text-[#111827]">
        Custom
      </div>

      <div className="text-[13px] text-[#6B7280]">
        pricing
      </div>

      <div className="flex-1"></div>

      <button 
      onClick={handleContactSales}
      className="mt-4 w-full h-[42px] border border-[#9CA3AF] text-[#374151] rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition">
         
        Contact Sales
      
      </button>
    </div>

  </div>
</div>

      </div>
    </section>
  );
}