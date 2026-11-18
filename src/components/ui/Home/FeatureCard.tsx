
// "use client";

// import Image from "next/image";
// import Link from "next/link";

// interface Service {
//   _id: string;
//   title: string;
//   image: string;
//   category: string;
//   serviceMode: string;
//   basePrice: number;
//   technicianName: string;
// }

// interface ServiceCardProps {
//   service: Service;
// }

// const ServiceCard = ({ service }: ServiceCardProps) => {
//   return (
//     <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
//       {/* Service Image */}
//       <div className="relative aspect-[16/10] w-full bg-gray-100">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           unoptimized
//           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           className="object-cover"
//         />
//       </div>

//       {/* Service Information */}
//       <div className="flex flex-1 flex-col p-4">
//         <h3 className="line-clamp-1 text-lg font-semibold text-[#10233F]">
//           {service.title}
//         </h3>

//         <div className="mt-2 flex flex-wrap items-center gap-2">
//           <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
//             {service.category}
//           </span>
//           <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
//             {service.serviceMode}
//           </span>
//         </div>

//         <div className="mt-4">
//           <p className="text-xs text-gray-500">Starting Price</p>
//           <p className="text-xl font-bold text-blue-600">
//             ${service.basePrice}
//           </p>
//         </div>

//         <p className="mt-3 text-sm text-gray-600">
//           Technician: <span className="font-medium text-[#10233F]">{service.technicianName}</span>
//         </p>

//         {/* Details Button */}
//         <Link
//           href={`/services/${service._id}`}
//           className="mt-auto block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// interface Service {
//   _id: string;
//   title: string;
//   image: string;
//   category: string;
//   serviceMode: string;
//   basePrice: number;
//   technicianName: string;
// }

// interface ServiceCardProps {
//   service: Service;
// }

// const ServiceCard = ({ service }: ServiceCardProps) => {
//   return (
//     <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#345071] bg-[#172F50] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
//       {/* Service Image */}
//       <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           unoptimized
//           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
//         />
//       </div>

//       {/* Service Information */}
//       <div className="flex flex-1 flex-col p-5">
//         {/* Service Title */}
//         <h3 className="line-clamp-1 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
//           {service.title}
//         </h3>

//         {/* Category and Service Mode */}
//         <div className="mt-3 flex flex-wrap items-center gap-2">
//           <span className="rounded-full bg-[#263F60] px-3 py-1 text-xs font-medium text-blue-200">
//             {service.category}
//           </span>

//           <span className="rounded-full bg-[#263F60] px-3 py-1 text-xs font-medium text-gray-200">
//             {service.serviceMode}
//           </span>
//         </div>

//         {/* Starting Price */}
//         <div className="mt-5">
//           <p className="text-xs text-gray-300">Starting Price</p>
//           <p className="text-2xl font-bold text-white">
//             ${service.basePrice}
//           </p>
//         </div>

//         {/* Technician Name */}
//         <p className="mt-4 text-sm text-gray-300 mb-2">
//           Technician: <span className="font-semibold text-white">{service.technicianName}</span>
//         </p>

//         {/* View Details Button */}
//         <Link
//           href={`/services/${service._id}`}
//           className="mt-auto mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1D4ED8] hover:shadow-md"
//         >
//           View Details
//           <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  image: string;
  category: string;
  serviceMode: string;
  basePrice: number;
  technicianName: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#29415F] bg-[#142B49] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Service Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#10233F]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Service Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title and Category */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-semibold text-white">
            {service.title}
          </h3>

          <span className="shrink-0 rounded-full bg-[#263F60] px-2.5 py-1 text-[10px] font-medium text-blue-200">
            {service.category}
          </span>
        </div>

        {/* Price and Service Mode */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] text-gray-400">Starting Price</p>
            <p className="text-xl font-bold text-white">
              ${service.basePrice}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-gray-400">Service Mode</p>
            <p className="text-sm font-medium text-blue-200">
              {service.serviceMode}
            </p>
          </div>
        </div>

        {/* Technician */}
        <div className="mt-3 border-t border-[#29415F] pt-2">
          <p className="truncate text-xs text-gray-300">
            Technician: <span className="font-medium text-white">{service.technicianName}</span>
          </p>
        </div>

        {/* View Details Button */}
        <Link
          href={`/services/${service._id}`}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#1D4ED8]"
        >
          View Details
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
