import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
import Logo from "../assets/logo.png";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState<any[]>([]);
  const [appointmentButton, setAppointmentButton] = useState<{
    name: string;
    linkUrl: string;
  } | null>(null);

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories`);
      const data = await res.json();

      const filtered = data.filter(
        (item: any) => item.is_include_top_nav && item.status === "active"
      );

      setNavItems(filtered);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const loadAppointmentButton = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/button`);
      const json = await res.json();

      if (json.success && json.data.length > 0) {
        const activeButton = json.data.find((b: any) => b.status === true);

        if (activeButton) {
          setAppointmentButton({
            name: activeButton.name,
            linkUrl: activeButton.linkUrl,
          });
        }
      }
    } catch (error) {
      console.error("Failed to load appointment button", error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadAppointmentButton();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Company Logo" className="w-25" />
          </Link>

          <div className="hidden lg:flex flex-1 justify-start" style={{ marginLeft: "12%" }}>
            <ul className="flex gap-[40px] items-center">
              {navItems.map((item) => (
                <li key={item.id} className="relative min-w-max">
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `relative pb-1 ${isActive ? "text-[#F0A324]" : "text-[#333333]"
                      }
            after:content-[''] after:absolute after:left-0 after:-bottom-1
            after:h-[2px] after:bg-[#F0A324] after:transition-all after:duration-300
            ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                    }
                    style={{
                      fontFamily: "Ubuntu, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {appointmentButton && (
                <NavLink
                  to={appointmentButton.linkUrl}
                  className={({ isActive }) =>
                    `px-5 py-3 rounded-lg min-w-max  ${isActive ? "bg-[#d98f1f]" : "bg-[#F0A324]"
                    }`
                  }
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "2%",
                  }}
                >
                  {appointmentButton.name}
                </NavLink>
              )}

            </ul>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        {appointmentButton && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
            <Link
              to={appointmentButton.linkUrl}
              className="block w-full text-center py-4 bg-[#ff4d4f] text-white font-semibold text-lg"
            >
              {appointmentButton.name}
            </Link>
          </div>
        )}

        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 pb-4">
            <nav className="px-4 pt-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-gray-50 hover:text-[#ff8a00]"
                >
                  {item.name}
                </Link>
              ))}

              {/* {appointmentButton && (
                <Link
                  to={appointmentButton.linkUrl}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
                >
                  {appointmentButton.name}
                </Link>
              )} */}

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;