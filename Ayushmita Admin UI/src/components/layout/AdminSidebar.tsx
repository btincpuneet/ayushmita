import { NavLink } from "react-router-dom";
import { FolderOpen, LogOut, ChevronLeft, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-50 bg-[#0B1221] text-white border-r border-white/10 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* HEADER */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <span className="text-xl font-bold tracking-wide">Admin Panel</span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* ONLY MENU ITEM */}
      <nav className="flex-1 space-y-1 p-4">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Categories</span>}
        </NavLink>

        <NavLink
          to="/admin/promo-slider"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Promo Slider</span>}
        </NavLink>
        <NavLink
          to="/admin/hero-banner"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Hero Banner</span>}
        </NavLink>
         <NavLink
          to="/admin/manage-doctor"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Doctors</span>}
        </NavLink>
        <NavLink
          to="/admin/topartnerDetails"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Hospitals</span>}
        </NavLink>
         <NavLink
          to="/admin/testimonials"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-white/10",
              collapsed && "justify-center"
            )
          }
        >
          <FolderOpen size={20} />
          {!collapsed && <span>Manage Testimonials</span>}
        </NavLink>
      </nav>



      {/* BOTTOM USER & LOGOUT */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && user && (
          <div className="mb-3">
            <p className="font-semibold text-sm">{user.name || "Admin User"}</p>
            <p className="text-xs text-gray-400 truncate">
              {user.email || "admin@example.com"}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-500 text-sm font-medium hover:bg-white/10 transition",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
