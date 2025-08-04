import { useState } from "react";
import { Search, Eye, Edit, Package, AlertCircle } from "lucide-react";

export default function ViewOrdersContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Sample orders data
  const [orders] = useState([
    {
      id: '#ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      product: 'Rolex Submariner',
      quantity: 1,
      total: 8500,
      status: 'pending',
      orderDate: '2024-01-15',
      shippingAddress: '123 Main St, New York, NY'
    },
    {
      id: '#ORD-002',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      product: 'Omega Speedmaster',
      quantity: 1,
      total: 6200,
      status: 'processing',
      orderDate: '2024-01-14',
      shippingAddress: '456 Oak Ave, Los Angeles, CA'
    },
    {
      id: '#ORD-003',
      customerName: 'Michael Brown',
      customerEmail: 'michael@example.com',
      product: 'Patek Philippe Calatrava',
      quantity: 1,
      total: 25000,
      status: 'shipped',
      orderDate: '2024-01-13',
      shippingAddress: '789 Pine St, Chicago, IL'
    },
    {
      id: '#ORD-004',
      customerName: 'Emma Davis',
      customerEmail: 'emma@example.com',
      product: 'Audemars Piguet Royal Oak',
      quantity: 1,
      total: 32000,
      status: 'delivered',
      orderDate: '2024-01-12',
      shippingAddress: '321 Elm St, Miami, FL'
    },
    {
      id: '#ORD-005',
      customerName: 'David Miller',
      customerEmail: 'david@example.com',
      product: 'Rolex Daytona',
      quantity: 1,
      total: 15000,
      status: 'cancelled',
      orderDate: '2024-01-11',
      shippingAddress: '654 Maple Dr, Seattle, WA'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-300';
      case 'processing':
        return 'bg-blue-900/30 text-blue-300';
      case 'shipped':
        return 'bg-purple-900/30 text-purple-300';
      case 'delivered':
        return 'bg-green-900/30 text-green-300';
      case 'cancelled':
        return 'bg-red-900/30 text-red-300';
      default:
        return 'bg-gray-900/30 text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Package className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const orderStats = {
    total: filteredOrders.length,
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    processing: filteredOrders.filter(o => o.status === 'processing').length,
    shipped: filteredOrders.filter(o => o.status === 'shipped').length,
    delivered: filteredOrders.filter(o => o.status === 'delivered').length,
    cancelled: filteredOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">{orderStats.total}</p>
        </div>
        <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
          <p className="text-yellow-300 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{orderStats.pending}</p>
        </div>
        <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
          <p className="text-blue-300 text-sm">Processing</p>
          <p className="text-2xl font-bold text-blue-400">{orderStats.processing}</p>
        </div>
        <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
          <p className="text-purple-300 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-400">{orderStats.shipped}</p>
        </div>
        <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-300 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-400">{orderStats.delivered}</p>
        </div>
        <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
          <p className="text-red-300 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-400">{orderStats.cancelled}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">All Orders</h3>
            <p className="text-gray-400">Monitor and manage customer orders</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-yellow-500 font-medium">
              Total Revenue: ${totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders, customers, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-yellow-500">Order ID</th>
                <th className="pb-3 text-yellow-500">Customer</th>
                <th className="pb-3 text-yellow-500">Product</th>
                <th className="pb-3 text-yellow-500">Quantity</th>
                <th className="pb-3 text-yellow-500">Total</th>
                <th className="pb-3 text-yellow-500">Status</th>
                <th className="pb-3 text-yellow-500">Date</th>
                <th className="pb-3 text-yellow-500">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 font-medium text-yellow-400">{order.id}</td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-3">{order.product}</td>
                  <td className="py-3">{order.quantity}</td>
                  <td className="py-3 font-bold">${order.total.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-400 hover:text-green-300 p-1"
                        title="Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
