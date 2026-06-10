
import React from "react";
import {
  Clock,
  Phone,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  FileText,
  BarChart3,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function AICallAgentSection() {
  const comparisonData = [
    {
      icon: Clock,
      title: "Availability",
      human: "Business hours only",
      ai: "24/7, 365 days a year",
    },
    {
      icon: Phone,
      title: "Missed Calls",
      human: "Common during busy hours or after hours",
      ai: "Answers every call instantly",
    },
    {
      icon: Users,
      title: "Multiple Calls",
      human: "One call at a time",
      ai: "Handles multiple calls simultaneously",
    },
    {
      icon: GraduationCap,
      title: "Training",
      human: "Requires training and supervision",
      ai: "Pre-trained on your business",
    },
    {
      icon: DollarSign,
      title: "Monthly Cost",
      human: "$2,000 - $5,000+",
      ai: "Pay only for usage",
    },
    {
      icon: Calendar,
      title: "Sick Leave / Holidays",
      human: "Yes",
      ai: "No",
    },
    {
      icon: FileText,
      title: "CRM & Follow-ups",
      human: "Manual",
      ai: "Automated",
    },
    {
      icon: BarChart3,
      title: "Call Summary",
      human: "Manual notes",
      ai: "Instant summaries",
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      human: "Hard to scale",
      ai: "Easily scales with your business",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            AI CALL AGENT
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Never Miss Another Customer Call
        </h2>

        <p className="text-center text-gray-600 max-w-4xl mx-auto text-base md:text-lg mb-6 px-2">
          Our AI Call Agent answers every call, 24/7, qualifies leads,
          books appointments, <br /> and sends call summaries to your team —
          for a fraction of the cost of a human.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Comparison Table */}
          <div className="lg:col-span-3 border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
          <div className="min-w-[750px]">

            <div className="grid grid-cols-[1.6fr_0.9fr_1fr] bg-gray-50">

              <div className="p-4 md:p-6 font-bold text-sm md:text-lg border-r">
                AI Call Agent vs Human Receptionist
              </div>

              <div className="p-4 md:p-6 text-center font-semibold text-sm md:text-base border-r">
                Human Receptionist
              </div>
             
             
              <div className="flex items-center justify-center  p-2 font-semibold text-blue-700 bg-transparent">
              <Image
                src="/images/im-2.png"
                alt="AI Agent"
                width={100}
                height={100}
                className="w-20 md:w-28 h-auto -mt-1"
              />

              <span className="text-sm md:text-base">Neurovise AI Call Agent</span>
            </div>

            </div>

            {comparisonData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="grid grid-cols-[1.6fr_0.9fr_1fr] border-t"
                >
                  <div className="p-3 flex items-center gap-2 md:gap-3 border-r text-sm md:text-base">
                    <Icon size={16} className="shrink-0" />
                    <span>{item.title}</span>
                  </div>

                  <div className="p-3 border-r text-gray-600 text-sm md:text-base">
                    {item.human}
                  </div>

                  <div className="p-3 text-green-600 font-semibold text-sm md:text-base">
                    {item.ai}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          </div>

          {/* Right Card */}
          <div className="bg-blue-50 rounded-3xl p-6 md:p-8">

            <div className="flex justify-center -mt-6">
              <Image
               src="/images/robo-1.png"
               alt="AI Agent"
               width={100}
               height={100}
               className="w-64 md:w-80 lg:w-96 h-auto mx-auto"
             />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
              More Than Just
              <br />
              Call Answering
            </h3>

            <div className="space-y-4">

              {[
                "Answer FAQs",
                "Qualify Leads",
                "Book Appointments",
                "Capture Caller Information",
                "Send Call Summaries",
                "Integrate with your CRM & Tools",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    className="text-blue-600"
                    size={20}
                  />
                  <span>{item}</span>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}