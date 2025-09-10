"use client";
import React, { useState } from "react";

const features = [
  {
    title: "Diner Search",
    href: "#diner-search",
    description: "Find customers who love your cuisine and dining experience.",
  },
  {
    title: "Campaign Creator",
    href: "#campaign-creator",
    description: "Create marketing campaigns that convert browsers into diners.",
  },
  {
    title: "Analytics",
    href: "#analytics",
    description: "Track campaign performance and see what drives customers.",
  },
  {
    title: "Targeting",
    href: "#targeting",
    description: "Target based on dining preferences, location, and behavior.",
  },
  {
    title: "Results Tracking",
    href: "#results",
    description: "Real-time tracking of campaign performance and ROI.",
  },
];

interface ListItemProps {
  to: string;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function ListItem({ title, children, to, onClick }: ListItemProps) {
  return (
    <li>
      <a
        href={to}
        onClick={onClick}
        className="block px-4 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="font-medium">{title}</div>
        {children && (
          <p className="text-sm text-gray-500 mt-1 mb-0">
            {children}
          </p>
        )}
      </a>
    </li>
  );
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Get More Diners
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <div className="space-y-1">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <ul className="flex space-x-1">
              {/* Home Dropdown */}
              <li className="relative group">
                <button className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors">
                  Home
                </button>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 w-72 border border-gray-200">
                  <ListItem to="/" title="Home">
                    Learn how to grow your restaurant with targeted marketing.
                  </ListItem>
                  <ListItem to="#features" title="Features">
                    Discover tools to attract more customers.
                  </ListItem>
                  <ListItem to="#how-it-works" title="How It Works">
                    Three simple steps to more customers and revenue.
                  </ListItem>
                </ul>
              </li>

              {/* Features Dropdown */}
              <li className="relative group">
                <button className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors">
                  Features
                </button>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 w-72 border border-gray-200">
                  {features.map((feature) => (
                    <ListItem key={feature.title} to={feature.href} title={feature.title}>
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </li>

              {/* Resources Dropdown */}
              <li className="relative group">
                <button className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors">
                  Resources
                </button>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-1 w-72 border border-gray-200">
                  <ListItem to="#help" title="Help Center">
                    Get support and answers to common questions.
                  </ListItem>
                  <ListItem to="#tutorials" title="Tutorials">
                    Learn how to maximize your restaurant marketing.
                  </ListItem>
                  <ListItem to="#blog" title="Blog">
                    Read our latest restaurant marketing insights.
                  </ListItem>
                </ul>
              </li>

              {/* Login/Signup */}
              <li>
                <a
                  href="#login"
                  className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#signup"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-4 border-t border-gray-200">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </div>
                <ul className="ml-4 space-y-1">
                  {features.map((feature) => (
                    <li key={feature.title}>
                      <a
                        href={feature.href}
                        onClick={closeMenu}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Resources
                </div>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      href="#help"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tutorials"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pt-4 border-t border-gray-200">
                <a
                  href="#login"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#signup"
                  onClick={closeMenu}
                  className="block px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors mx-4"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;