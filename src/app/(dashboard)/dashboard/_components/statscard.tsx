
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  return (
    <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <h2 className="mt-3 text-3xl font-bold text-white">{value}</h2>
        </div>
        <div className="rounded-xl bg-[#264669] p-3">
          <Icon size={27} className={color} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
