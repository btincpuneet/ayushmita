import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto ml-64 transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
