import React, { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Links } from "react-router-dom";

const Navbar = ({ onNavigate, currentSection, onSectionChange }) => {
  const [isMobileOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", section: "hero" },
    { name: "Features", section: "features" },
    { name: "How It Works", section: "how-it-works" },
    { name: "CTA", section: "cta" },
  ];
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behaviour: "smooth" });
      onSectionChange(section);
    }
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center cursor-pointer gap-2"
          >
            <FileText className="text-white w-6 h-6" />
            <p className="text-xl text-white font-bold">
              Brian<span className="text-gray-400">MCQ</span>
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key="link.name"
                onClick={() => scrollToSection(link.section)}
                className={`text-sm transition ${
                  currentSection === link.section
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <button
              className="px-8 py-2 rounded-xs bg-white text-black font-semibold hover:bg-bgray-200 transition transsform hover:scale-105"
              onClick={() => onNavigate("login")}
            >
              Get Started
            </button>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {isMobileOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.section)}
                className="block w-full text-left py-4 text-gray-400 hover:text-white transition"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate("login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-6 mt-4 py-2 font-semibold rounded-xs bg-white text-black hover:bg-gray-200 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
