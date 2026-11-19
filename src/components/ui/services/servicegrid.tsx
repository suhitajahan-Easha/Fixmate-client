
import ServiceCard from "@/components/ui/Home/servicecard";

type Service = {
  _id: string;
  title: string;
  category: string;
  image: string;
  serviceMode: "home-visit" | "shop-drop-off";
  serviceArea: string;
  basePrice: number;
  technicianName: string;
};

export default function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}
