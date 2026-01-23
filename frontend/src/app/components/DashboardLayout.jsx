import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '/app/contexts/AppContext';
import { useLanguage } from '/app/contexts/LanguageContext';
import { Button } from '/app/components/ui/button';
import { Badge } from '/app/components/ui/badge';
import {
  LayoutDashboard,
  Package,
  Calendar,
  CreditCard,
  Bell,
  User,
  LogOut,
  Wrench,
  Menu,
  X,
  Users,
  History,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';

export function DashboardLayout({ children }) {
  const { user, setUser, notifications } = useApp();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.plans'), href: '/plans', icon: Package },
    { name: 'Services', href: '/services', icon: Wrench },
    { name: 'Technicians', href: '/technicians', icon: Users },
    { name: t('nav.book'), href: '/book-service', icon: Calendar },
    { name: 'History', href: '/history', icon: History },
    { name: t('nav.payments'), href: '/payments', icon: CreditCard },
    { name: t('nav.notifications'), href: '/notifications', icon: Bell, badge: unreadCount },
    { name: 'Support', href: '/support', icon: HelpCircle },
    { name: t('nav.profile'), href: '/profile', icon: User },
  ];

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Wrench className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold">FixMate</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                      {item.badge ? (
                        <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-xs">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">
                    {language === 'en' ? 'English' : language === 'si' ? 'සිංහල' : 'தமிழ்'}
                  </span>
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('si');
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      සිංහල
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ta');
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      தமிழ்
                    </button>
                  </div>
                )}
              </div>

              {/* User & Logout */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('common.logout')}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="px-4 pt-2 pb-4 space-y-1">
              {navigation.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                    {item.badge ? (
                      <Badge variant="destructive" className="ml-auto px-2 py-0 text-xs">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full"
              >
                <LogOut className="w-5 h-5" />
                {t('common.logout')}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
