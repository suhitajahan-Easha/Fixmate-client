import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChangeUserRole from "../../_components/changeuserroleAdmin";

type User = {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  role: "customer" | "technician" | "admin";
  createdAt?: string;
};

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check login
  if (!session) {
    return (
      <div className="p-6 text-center">
        <p>Please sign in to continue.</p>
        <Link href="/sign-in" className="mt-3 inline-block text-blue-600">
          Sign In
        </Link>
      </div>
    );
  }

  // Check admin role
  if (session.user.role !== "admin") {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="mt-2 text-gray-500">
          You are not allowed to access this page.
        </p>
        <Link href="/" className="mt-4 inline-block text-blue-600">
          Back to Home
        </Link>
      </div>
    );
  }

  let users: User[] = [];
  let errorMessage = "";

  // Fetch all users
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    users = data.result || [];
  } catch (error) {
    console.error("Users fetch error:", error);
    errorMessage = "Failed to load users. Please try again.";
  }

  const customers = users.filter((user) => user.role === "customer").length;
  const technicians = users.filter((user) => user.role === "technician").length;

  const getRoleStyle = (role: string) => {
    if (role === "admin") return "bg-indigo-100 text-indigo-700";
    if (role === "technician") return "bg-purple-100 text-purple-700";
    return "bg-blue-100 text-blue-700";
  };

  const getInitial = (name?: string) => {
    return name?.trim().charAt(0).toUpperCase() || "U";
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <span>←</span> Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Manage Users
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage all registered users.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {users.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Customers</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              {customers}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Technicians</p>
            <h2 className="mt-2 text-2xl font-bold text-purple-600">
              {technicians}
            </h2>
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold text-gray-900">All Users</h2>
            <p className="mt-1 text-sm text-gray-500">
              {users.length} registered users
            </p>
          </div>

          {errorMessage ? (
            <div className="p-8 text-center text-sm text-red-500">
              {errorMessage}
            </div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No users found.
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Joined Date</th>
                      <th className="px-6 py-4 font-medium">Change Role</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                {getInitial(user.name)}
                              </div>
                            )}
                            <span className="font-medium text-gray-900">
                              {user.name || "Unnamed User"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleStyle(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <ChangeUserRole
                            userId={user._id}
                            currentRole={user.role}
                            loggedInUserId={session.user.id}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y md:hidden">
                {users.map((user) => (
                  <div key={user._id} className="space-y-3 p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {getInitial(user.name)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">
                          {user.name || "Unnamed User"}
                        </h3>
                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleStyle(user.role)}`}
                      >
                        {user.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        Joined: {formatDate(user.createdAt)}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="mb-2 text-xs font-medium text-gray-500">
                        Change User Role
                      </p>
                      <ChangeUserRole
                        userId={user._id}
                        currentRole={user.role}
                        loggedInUserId={session.user.id}
                      />
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
