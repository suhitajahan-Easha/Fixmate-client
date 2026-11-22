
const BookingLoading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Heading */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Four Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-3 h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Booking Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <div className="h-5 w-36 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-9 w-28 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Table Header */}
        <div className="hidden grid-cols-6 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 sm:grid dark:border-gray-700 dark:bg-gray-800">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid grid-cols-2 items-center gap-4 px-5 py-5 sm:grid-cols-6">
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <div key={cellIndex} className={`${cellIndex > 1 ? "hidden sm:block" : ""} h-4 w-full max-w-24 rounded bg-gray-200 dark:bg-gray-700`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingLoading;
