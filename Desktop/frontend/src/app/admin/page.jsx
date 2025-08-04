"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Plus,
  Home,
  FileText,
  UserCheck,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";

// Import admin components
import DashboardContent from "@/components/admin/DashboardContent";
import AddProductContent from "@/components/admin/AddProductContent";
import ViewProductsContent from "@/components/admin/ViewProductsContent";
import EditProductsContent from "@/components/admin/EditProductsContent";
import ViewOrdersContent from "@/components/admin/ViewOrdersContent";
import OrderStatusContent from "@/components/admin/OrderStatusContent";
import ViewUsersContent from "@/components/admin/ViewUsersContent";
import UserRolesContent from "@/components/admin/UserRolesContent";
import AnalyticsContent from "@/components/admin/AnalyticsContent";
import RevenueContent from "@/components/admin/RevenueContent";
import SettingsContent from "@/components/admin/SettingsContent";

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouter();

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.isAdmin || false;

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!isAdmin) {
      // Show unauthorized message for regular users
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
  }, [isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">
              {!isAuthenticated 
                ? "You need to be logged in to access this page."
                : "You don't have admin privileges to access this panel."
              }
            </p>
          </div>
          
          <div className="space-y-3">
            {!isAuthenticated ? (
              <Link 
                href="/login"
                className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Go to Login
              </Link>
            ) : (
              <Link 
                href="/"
                className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Homepage
              </Link>
            )}
          </div>
          
          {isAuthenticated && (
            <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm">
                <strong>Current User:</strong> {user?.email || 'Unknown'}
              </p>
              <p className="text-blue-300 text-sm">
                <strong>Role:</strong> {user?.role || 'user'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sidebar menu items
  const sidebarItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Home,
      description: 'Overview & Statistics'
    },
    { 
      id: 'add-product', 
      name: 'Add New Product', 
      icon: Plus,
      description: 'Create new watch listings'
    },
    { 
      id: 'view-products', 
      name: 'View All Products', 
      icon: Package,
      description: 'Manage product inventory'
    },
    { 
      id: 'edit-products', 
      name: 'Edit Products', 
      icon: Edit,
      description: 'Modify existing products'
    },
    { 
      id: 'view-orders', 
      name: 'View All Orders', 
      icon: ShoppingCart,
      description: 'Monitor customer orders'
    },
    { 
      id: 'order-status', 
      name: 'Update Order Status', 
      icon: FileText,
      description: 'Manage order fulfillment'
    },
    { 
      id: 'view-users', 
      name: 'View All Users', 
      icon: Users,
      description: 'Customer management'
    },
    { 
      id: 'user-roles', 
      name: 'Manage User Roles', 
      icon: UserCheck,
      description: 'User permissions'
    },
    { 
      id: 'analytics', 
      name: 'Sales Analytics', 
      icon: BarChart3,
      description: 'Performance insights'
    },
    { 
      id: 'revenue', 
      name: 'Revenue Reports', 
      icon: TrendingUp,
      description: 'Financial analysis'
    },
    { 
      id: 'settings', 
      name: 'System Settings', 
      icon: Settings,
      description: 'Application configuration'
    }
  ];

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'add-product':
        return <AddProductContent />;
      case 'view-products':
        return <ViewProductsContent />;
      case 'edit-products':
        return <EditProductsContent />;
      case 'view-orders':
        return <ViewOrdersContent />;
      case 'order-status':
        return <OrderStatusContent />;
      case 'view-users':
        return <ViewUsersContent />;
      case 'user-roles':
        return <UserRolesContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'revenue':
        return <RevenueContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 h-full w-80 bg-gray-900/95 backdrop-blur-md border-r border-yellow-500/20 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-yellow-500">Admin Panel</h2>
            <p className="text-sm text-gray-400">Luxury Watches Store</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{user?.name || 'Admin'}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <Link 
            href="/"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Bar */}
        <header className="bg-gray-900/50 backdrop-blur-md border-b border-yellow-500/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {sidebarItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-400">
                  {sidebarItems.find(item => item.id === activeSection)?.description || 'Admin Overview'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
