import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
