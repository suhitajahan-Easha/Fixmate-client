
import Link from "next/link";

type Props = {
  search?: string;
  category?: string;
  mode?: string;
  sort?: string;
};

const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];

export default function ServiceFilters({ search = "", category = "", mode = "", sort = "newest" }: Props) {
  return (
    <form action="/services" method="GET" className="rounded-xl border border-[#29415F] bg-[#1B3658] p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search service or category..."
          className="w-full rounded-lg border border-[#345071] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
        />

        <select name="category" defaultValue={category} className="w-full rounded-lg border border-[#345071] bg-[#264669] px-4 py-3 text-sm text-white outline-none focus:border-blue-500">
          <option value="">All Categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select name="mode" defaultValue={mode} className="w-full rounded-lg border border-[#345071] bg-[#264669] px-4 py-3 text-sm text-white outline-none focus:border-blue-500">
          <option value="">All Service Modes</option>
          <option value="home-visit">Home Visit</option>
          <option value="shop-drop-off">Shop Drop-off</option>
        </select>

        <select name="sort" defaultValue={sort} className="w-full rounded-lg border border-[#345071] bg-[#264669] px-4 py-3 text-sm text-white outline-none focus:border-blue-500">
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
          Apply Filters
        </button>
        <Link href="/services" className="rounded-lg border border-[#45617F] px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-[#264669]">
          Clear Filters
        </Link>
      </div>
    </form>
  );
}
