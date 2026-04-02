import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 mt-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left side: brand + description */}
        <div className="space-y-4 text-center md:text-left">
          <div className="font-manrope font-black text-blue-950 dark:text-white text-xl">
            Kerala Election 2026          </div>
          <p className="font-inter text-xs text-slate-500 max-w-xs">
            © 2026 The Informed Citizen. All electoral data verified. Dedicated
            to radical transparency in democracy.
          </p>
        </div>

        {/* Right side: links + icons */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Links */}
          <div className="flex gap-6 font-inter text-xs">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity opacity-80 hover:opacity-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity opacity-80 hover:opacity-100"
            >
              Data Sources
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity opacity-80 hover:opacity-100"
            >
              API Access
            </a>
          </div>

          {/* Icons */}
          <div className="flex gap-4">
            <button
              aria-label="Share"
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
            <button
              aria-label="Language"
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">language</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
