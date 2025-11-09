'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm'
            : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-md">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                Finance Tracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="text-gray-700">
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="text-gray-900" size={24} />
              ) : (
                <Menu className="text-gray-900" size={24} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 sm:top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl slide-in-down">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start text-lg py-6">
                  Connexion
                </Button>
              </Link>
              <Link href="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full text-lg py-6">Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
