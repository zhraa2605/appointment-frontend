import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/useUser";
import NotificationBell from "@/components/Notification";
import { Menu, X, Heart } from "lucide-react";

const headerItems = [
  { label: "Sign Up", path: "/signup", roles: ["guest"] },
  { label: "User Management", path: "/admin", roles: ["admin"] },
  { label: "Doctors", path: "/doctors", roles: ["admin", "doctor", "user"] },
  {
    label: "Appointment Management",
    path: "/appointmentmanage",
    roles: ["admin", "doctor"],
  },
  {
    label: "My Appointments",
    path: "/userappointments",
    roles: ["user", "admin"],
  },
];

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { role } = useUser();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleClickOutside = useCallback(
    (e) => {
      const sidebar = document.getElementById("sidebar");
      const hamburger = document.getElementById("hamburger-button");

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(e.target) &&
        hamburger &&
        !hamburger.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    },
    [isSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const filteredHeaderItems = headerItems.filter((item) =>
    item.roles.includes(role || "guest")
  );

  const renderNavButton = ({ label, path }) => (
    <Link key={path} to={path}>
      <Button
        variant="ghost"
        className={`text-md ${
          location.pathname === path
            ? "text-blue-600 font-semibold"
            : "text-blue-800 hover:text-blue-600"
        } hover:bg-blue-50`}
      >
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="relative z-20" dir="ltr">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        {/* Logo */}

        <Link to="/">
          <div className="flex items-center gap-2">
            <Heart className=" text-blue-800" />

            <span className="text-xl font-bold text-blue-800">
              Healthcare Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-1 items-center">
          {filteredHeaderItems.map(renderNavButton)}
          <NotificationBell />
        </div>

        {/* Mobile Hamburger */}
        <Button
          id="hamburger-button"
          variant="ghost"
          className="md:hidden text-blue-800"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col pt-20 px-4 relative">
          {/* Close Icon */}
          <Button
            variant="ghost"
            className="absolute top-6 right-4 text-blue-800"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Sidebar Nav */}
          <nav className="flex flex-col items-start space-y-4">
            {filteredHeaderItems.map(({ label, path }) => (
              <Link key={path} to={path} className="w-full">
                <Button
                  variant="ghost"
                  className={`w-full flex justify-start text-lg py-3 ${
                    location.pathname === path
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-blue-800 hover:text-blue-600"
                  } hover:bg-blue-50`}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
