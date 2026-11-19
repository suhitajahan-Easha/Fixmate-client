
// import Link from "next/link";

// type Service = {
//   _id: string;
//   title: string;
//   category: string;
//   image: string;
//   serviceMode: "home-visit" | "shop-drop-off";
//   serviceArea: string;
//   basePrice: number;
//   technicianName: string;
// };

// type Props = {
//   service: Service;
// };

// export default function ServiceCard({ service }: Props) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
//       <img
//         src={service.image}
//         alt={service.title}
//         className="h-48 w-full object-cover"
//       />

//       <div className="space-y-3 p-4">
//         <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
//           {service.category}
//         </span>

//         <h2 className="text-lg font-semibold text-gray-800">
//           {service.title}
//         </h2>

//         <div className="space-y-2 text-sm text-gray-600">
//           <p>
//             <span className="font-medium">Service Mode:</span>{" "}
//             {service.serviceMode === "home-visit"
//               ? "Home Visit"
//               : "Shop Drop-off"}
//           </p>

//           <p>
//             <span className="font-medium">Service Area:</span>{" "}
//             {service.serviceArea}
//           </p>

//           <p>
//             <span className="font-medium">Technician:</span>{" "}
//             {service.technicianName}
//           </p>
//         </div>

//         <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//           <div>
//             <p className="text-xs text-gray-500">Starting Price</p>
//             <p className="text-lg font-bold text-blue-600">
//               ${service.basePrice.toFixed(2)}
//             </p>
//           </div>

//           <Link
//             href={`/services/${service._id}`}
//             className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import Link from "next/link";

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

type Props = {
  service: Service;
};

export default function ServiceCard({ service }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#29415F] bg-[#1B3658] shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">
      <img
        src={service.image}
        alt={service.title}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-3 p-4">
        <span className="inline-block rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
          {service.category}
        </span>

        <h2 className="text-lg font-semibold text-white">
          {service.title}
        </h2>

        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <span className="font-medium text-gray-100">Service Mode:</span>{" "}
            {service.serviceMode === "home-visit"
              ? "Home Visit"
              : "Shop Drop-off"}
          </p>

          <p>
            <span className="font-medium text-gray-100">Service Area:</span>{" "}
            {service.serviceArea}
          </p>

          <p>
            <span className="font-medium text-gray-100">Technician:</span>{" "}
            {service.technicianName}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[#345071] pt-3">
          <div>
            <p className="text-xs text-gray-400">Starting Price</p>
            <p className="text-lg font-bold text-blue-400">
              ${service.basePrice.toFixed(2)}
            </p>
          </div>

          <Link
            href={`/services/${service._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
