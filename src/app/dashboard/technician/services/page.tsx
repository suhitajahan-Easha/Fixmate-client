// import Link from "next/link";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
// import { ArrowLeft, Plus, Wrench, Pencil, Trash2 } from "lucide-react";
// import AvailabilityToggle from "../../_components/availabilitytogglefortech";
// import EditServiceModal from "../../_components/editservicemodaltech";
// import DeleteServiceDialog from "../../_components/Deletedialogservicetech";
// import { Service } from "@/lib/type";


// export default async function MyServicesPage() {
//   // Get logged-in user session
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session?.user) {
//     return (
//       <div className="p-8 text-center">
//         <p>Please sign in to view your services.</p>
//         <Link href="/sign-in" className="mt-4 inline-block text-blue-600">
//           Sign In
//         </Link>
//       </div>
//     );
//   }

//   const user = session.user;

//   // Get technician services
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/services?id=${user.id}`
    
//   );
//   // const response = await fetch(
//   //   `${process.env.NEXT_PUBLIC_API_URL}/services?id=${user.id}`,
//   //   { cache: "no-store" },
//   // );

//   const data = await response.json();

//   const services: Service[] = response.ok ? data.result || [] : [];

//   const approvedServices = services.filter(
//     (service) => service.approvalStatus === "approved",
//   ).length;

//   const pendingServices = services.filter(
//     (service) => service.approvalStatus === "pending",
//   ).length;

//   const getStatusStyle = (status: string) => {
//     if (status === "approved") return "bg-green-100 text-green-700";
//     if (status === "rejected") return "bg-red-100 text-red-700";
//     return "bg-amber-100 text-amber-700";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <Link
//           href="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
//         >
//           <ArrowLeft size={18} />
//           Back to Home
//         </Link>

//         <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               My Services
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Manage and monitor your repair services.
//             </p>
//           </div>

//           <Link
//             href="/dashboard/technician/services/new"
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//           >
//             <Plus size={18} />
//             Add New Service
//           </Link>
//         </div>

//         {/* Summary */}
//         <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-xl border bg-white p-5">
//             <p className="text-sm text-gray-500">Total Services</p>
//             <h2 className="mt-2 text-2xl font-bold">{services.length}</h2>
//           </div>

//           <div className="rounded-xl border bg-white p-5">
//             <p className="text-sm text-gray-500">Approved Services</p>
//             <h2 className="mt-2 text-2xl font-bold text-green-600">
//               {approvedServices}
//             </h2>
//           </div>

//           <div className="rounded-xl border bg-white p-5">
//             <p className="text-sm text-gray-500">Pending Services</p>
//             <h2 className="mt-2 text-2xl font-bold text-amber-600">
//               {pendingServices}
//             </h2>
//           </div>
//         </div>

//         {/* Services */}
//         <div className="overflow-hidden rounded-xl border bg-white">
//           <div className="border-b px-5 py-4">
//             <h2 className="font-semibold text-gray-900">Your Services</h2>
//           </div>

//           {services.length === 0 ? (
//             <div className="flex flex-col items-center px-5 py-16 text-center">
//               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
//                 <Wrench size={30} className="text-blue-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 No services added yet
//               </h3>
//               <p className="mt-2 text-sm text-gray-500">
//                 Add your first repair service to get started.
//               </p>
//               <Link
//                 href="/dashboard/technician/services/new"
//                 className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 Add Your First Service
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* Desktop Table */}
//               <div className="hidden overflow-x-auto md:block">
//                 <table className="w-full text-left">
//                   <thead className="bg-gray-50 text-xs uppercase text-gray-500">
//                     <tr>
//                       <th className="px-6 py-4">Service</th>
//                       <th className="px-6 py-4">Category</th>
//                       <th className="px-6 py-4">Price</th>
//                       <th className="px-6 py-4">Approval Status</th>
//                       <th className="px-6 py-4">Availability</th>
//                       <th className="px-6 py-4 text-center">Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     {services.map((service) => (
//                       <tr key={service._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             {service.image ? (
//                               <img
//                                 src={service.image}
//                                 alt={service.title}
//                                 className="h-12 w-12 rounded-lg object-cover"
//                               />
//                             ) : (
//                               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
//                                 <Wrench className="text-blue-600" />
//                               </div>
//                             )}
//                             <span className="font-medium text-gray-900">
//                               {service.title}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {service.category}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-semibold">
//                           ${service.basePrice}
//                         </td>

//                         <td className="px-6 py-4">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(service.approvalStatus)}`}
//                           >
//                             {service.approvalStatus}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4">
//                           <AvailabilityToggle
//                             initialValue={service.isAvailable}
//                             serviceId={service._id}
//                             userId={user.id}
//                           />
//                         </td>

//                         <td className="px-6 py-4">
//                           <div className="flex justify-center gap-2">
//                             <EditServiceModal service={service} userId={user.id} />
//                             <DeleteServiceDialog serviceId={service._id} userId={user.id} />
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile Cards */}
//               <div className="divide-y divide-gray-100 md:hidden">
//                 {services.map((service) => (
//                   <div key={service._id} className="p-4">
//                     <div className="flex gap-3">
//                       {service.image ? (
//                         <img
//                           src={service.image}
//                           alt={service.title}
//                           className="h-20 w-20 rounded-lg object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-50">
//                           <Wrench className="text-blue-600" />
//                         </div>
//                       )}

//                       <div className="min-w-0 flex-1">
//                         <h3 className="font-semibold text-gray-900">
//                           {service.title}
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {service.category}
//                         </p>
//                         <p className="mt-1 font-semibold">
//                           ${service.basePrice}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//                       <div className="flex flex-wrap gap-2">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(service.approvalStatus)}`}
//                         >
//                           {service.approvalStatus}
//                         </span>
//                         <div className="mt-2">
//                           <AvailabilityToggle
//                             initialValue={service.isAvailable}
//                             serviceId={service._id}
//                            userId={user.id}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex gap-2">
//                         <EditServiceModal service={service} userId={user.id} />
//                         <DeleteServiceDialog serviceId={service._id} userId={user.id} />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ArrowLeft, Plus, Wrench } from "lucide-react";
import AvailabilityToggle from "../../_components/availabilitytogglefortech";
import EditServiceModal from "../../_components/editservicemodaltech";
import DeleteServiceDialog from "../../_components/Deletedialogservicetech";
import { Service } from "@/lib/type";

export default async function MyServicesPage() {
  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#10233F] p-8 text-center">
        <div>
          <p className="text-gray-300">Please sign in to view your services.</p>
          <Link href="/sign-in" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user;

  // Get technician services
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services?id=${user.id}`,
    { cache: "no-store" }
  );

  const data = await response.json();

  const services: Service[] = response.ok ? data.result || [] : [];

  const approvedServices = services.filter(
    (service) => service.approvalStatus === "approved",
  ).length;

  const pendingServices = services.filter(
    (service) => service.approvalStatus === "pending",
  ).length;

  const getStatusStyle = (status: string) => {
    if (status === "approved") return "bg-green-500/15 text-green-300";
    if (status === "rejected") return "bg-red-500/15 text-red-300";
    return "bg-yellow-500/15 text-yellow-300";
  };

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              My Services
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Manage and monitor your repair services.
            </p>
          </div>

          <Link
            href="/dashboard/technician/services/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add New Service
          </Link>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5">
            <p className="text-sm text-gray-300">Total Services</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{services.length}</h2>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5">
            <p className="text-sm text-gray-300">Approved Services</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">
              {approvedServices}
            </h2>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5">
            <p className="text-sm text-gray-300">Pending Services</p>
            <h2 className="mt-2 text-2xl font-bold text-yellow-400">
              {pendingServices}
            </h2>
          </div>
        </div>

        {/* Services */}
        <div className="overflow-hidden rounded-xl border border-[#345071] bg-[#1B3658]">
          <div className="border-b border-[#345071] px-5 py-4">
            <h2 className="font-semibold text-white">Your Services</h2>
          </div>

          {services.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#264669]">
                <Wrench size={30} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                No services added yet
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                Add your first repair service to get started.
              </p>
              <Link
                href="/dashboard/technician/services/new"
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Add Your First Service
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-[#142D4C] text-xs uppercase text-gray-300">
                    <tr>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Approval Status</th>
                      <th className="px-6 py-4">Availability</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#345071]">
                    {services.map((service) => (
                      <tr key={service._id} className="transition hover:bg-[#264669]/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {service.image ? (
                              <img
                                src={service.image}
                                alt={service.title}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#264669]">
                                <Wrench className="text-blue-400" />
                              </div>
                            )}
                            <span className="font-medium text-white">
                              {service.title}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-300">
                          {service.category}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-white">
                          ${service.basePrice}
                        </td>

                        <td className="px-6 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(service.approvalStatus)}`}>
                            {service.approvalStatus}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <AvailabilityToggle
                            initialValue={service.isAvailable}
                            serviceId={service._id}
                            userId={user.id}
                          />
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <EditServiceModal service={service} userId={user.id} />
                            <DeleteServiceDialog serviceId={service._id} userId={user.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-[#345071] md:hidden">
                {services.map((service) => (
                  <div key={service._id} className="p-4">
                    <div className="flex gap-3">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#264669]">
                          <Wrench className="text-blue-400" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-300">
                          {service.category}
                        </p>
                        <p className="mt-1 font-semibold text-white">
                          ${service.basePrice}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(service.approvalStatus)}`}>
                          {service.approvalStatus}
                        </span>
                        <div className="mt-2">
                          <AvailabilityToggle
                            initialValue={service.isAvailable}
                            serviceId={service._id}
                            userId={user.id}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <EditServiceModal service={service} userId={user.id} />
                        <DeleteServiceDialog serviceId={service._id} userId={user.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

