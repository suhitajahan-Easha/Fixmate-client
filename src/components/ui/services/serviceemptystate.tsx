
import Link from "next/link";

export default function ServiceEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-[#345071] bg-[#1B3658] px-4 py-16 text-center">
      <div className="mb-4 text-5xl">🔧</div>
      <h3 className="text-lg font-semibold text-white">No Services Found</h3>
      <p className="mt-2 text-sm text-gray-300">
        Try changing your search or filters to find available services.
      </p>
      <Link href="/services" className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
        View All Services
      </Link>
    </div>
  );
}
