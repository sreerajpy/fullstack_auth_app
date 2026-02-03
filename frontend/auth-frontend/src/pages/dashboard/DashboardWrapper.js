// DashboardWrapper.js (A Layout component for your protected pages)
export default function DashboardWrapper({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 font-bold text-xl text-blue-600">AdminPanel</div>
        <nav className="mt-4 px-4 space-y-2">
          <a href="/dashboard" className="block p-3 hover:bg-gray-100 rounded-lg">Dashboard</a>
          <a href="/usermanagement" className="block p-3 bg-blue-50 text-blue-600 rounded-lg">Users</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}