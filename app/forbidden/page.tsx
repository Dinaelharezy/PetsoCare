import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-200">403</h1>
        <p className="text-xl font-semibold text-gray-700">Access Denied</p>
        <p className="text-sm text-gray-500">
          You don't have permission to view this page.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}