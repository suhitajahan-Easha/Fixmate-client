
import { Search, ClipboardCheck, Wrench, Wallet } from "lucide-react";

const steps = [
  {
    title: "Discover",
    description: "Browse available repair services and choose the service you need.",
    icon: Search,
  },
  {
    title: "Request",
    description: "Submit your booking details and describe your repair problem.",
    icon: ClipboardCheck,
  },
  {
    title: "Repair",
    description: "A skilled technician takes care of your repair professionally.",
    icon: Wrench,
  },
  {
    title: "Pay",
    description: "Pay securely only after your repair service is completed.",
    icon: Wallet,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#111827] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How FixMate Works
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Getting your device repaired is easier than ever.
            Follow these four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="group flex flex-col items-center rounded-xl px-5 py-7 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-[#172F50]">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#263F60] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2563EB]">
                  <Icon size={30} className="text-blue-300 transition-colors duration-300 group-hover:text-white" />
                </div>

                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
