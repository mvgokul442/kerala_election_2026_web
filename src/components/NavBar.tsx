import { Bell, CircleUser, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinkClasses = (path: string) =>
    `pb-1 transition-colors duration-300 ${location.pathname === path
      ? "text-onSurface border-b-2 border-primary"
      : "text-onSurfaceVariant hover:text-primaryContainer"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-xl font-manrope font-bold tracking-tight text-primary dark:text-white">
          Kerala Election 2026
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-manrope text-sm font-semibold tracking-tight">
          <Link to="/" className={navLinkClasses("/")}>Home</Link>
          <Link to="/candidates" className={navLinkClasses("/candidates")}>Candidates</Link>
          <Link to="/about" className={navLinkClasses("/about")}>About</Link>
        </div>

        {/* Right side: icons + mobile toggle */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-onSurfaceVariant hover:bg-surfaceContainerLow rounded-full">
            <Bell />
          </button>
          <button className="p-2 text-onSurfaceVariant hover:bg-surfaceContainerLow rounded-full">
            <CircleUser />
          </button>
          {/* Hamburger only on mobile */}
          <button
            className="md:hidden p-2 text-onSurfaceVariant hover:bg-surfaceContainerLow rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col items-start px-6 py-4 space-y-4 bg-surface">
          <Link to="/" onClick={() => setOpen(false)} className={navLinkClasses("/")}>
            Home
          </Link>
          <Link to="/candidates" onClick={() => setOpen(false)} className={navLinkClasses("/candidates")}>
            Candidates
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className={navLinkClasses("/about")}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
