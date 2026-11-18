import Link from "next/link";
import {
  Smartphone,
  Laptop,
  AirVent,
  Refrigerator,
  Tv,
  WashingMachine,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Wrench,
  CreditCard,
} from "lucide-react";

const categories = [
  { name: "Smartphone", icon: Smartphone },
  { name: "Laptop & PC", icon: Laptop },
  { name: "AC", icon: AirVent },
  { name: "Refrigerator", icon: Refrigerator },
  { name: "TV", icon: Tv },
  { name: "Washing Machine", icon: WashingMachine },
  { name: "Electrical", icon: Zap },
];

const benefits = [
  {
    title: "Verified Technicians",
    icon: ShieldCheck,
  },
  {
    title: "Quality Repairs",
    icon: Wrench,
  },
  {
    title: "Pay After Service",
    icon: CreditCard,
  },
];

const PopularCategories = () => {
  return (
    <section className=" bg-[#02112f] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
            Explore Repair Categories
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What Do You Need Fixed?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
            Find the right repair service for your device or home appliance.
            Choose a category and explore available services.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/services?category=${encodeURIComponent(category.name)}`}
                className="group flex items-center justify-between rounded-xl border border-[#345071] bg-[#172F50] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-[#1D416B] hover:shadow-lg hover:shadow-blue-950/30 sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#263F60] transition-colors duration-300 group-hover:bg-blue-600 sm:h-12 sm:w-12">
                    <Icon
                      size={23}
                      className="text-blue-300 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    {category.name}
                  </h3>
                </div>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-blue-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                />
              </Link>
            );
          })}
        </div>

        {/* Why Choose FixMate */}
        <div className="mt-12 rounded-2xl bg-blue-600 px-5 py-8 sm:mt-16 sm:px-8 sm:py-10">
          <div className="mb-7 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Why Choose FixMate?
            </h3>

            <p className="mt-2 text-sm text-blue-100 sm:text-base">
              Reliable repair services with a better experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 transition-transform duration-300 hover:scale-110">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h4 className="text-base font-semibold text-white sm:text-lg">
                    {benefit.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;