export default function RevenueContent() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
      <h3 className="text-xl font-bold text-white mb-4">Revenue Reports</h3>
      <p className="text-gray-400 mb-6">Analyze financial performance and trends.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-2">Monthly Revenue</h4>
          <p className="text-2xl font-bold text-white">$12,450</p>
          <p className="text-green-300 text-sm">+15% from last month</p>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">Yearly Revenue</h4>
          <p className="text-2xl font-bold text-white">$145,230</p>
          <p className="text-blue-300 text-sm">+8% from last year</p>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-2">Average Order</h4>
          <p className="text-2xl font-bold text-white">$340</p>
          <p className="text-purple-300 text-sm">+5% increase</p>
        </div>
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
        <p className="text-indigo-300">
          <strong>Coming Soon:</strong> Detailed revenue charts and financial analytics dashboard.
        </p>
      </div>
    </div>
  );
}
