export default function SettingsContent() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
      <h3 className="text-xl font-bold text-white mb-4">System Settings</h3>
      <p className="text-gray-400 mb-6">Configure application settings and preferences.</p>
      
      <div className="space-y-6">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
          <h4 className="text-white font-semibold mb-3">General Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Site Maintenance Mode</span>
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Disabled
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email Notifications</span>
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Enabled
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
          <h4 className="text-white font-semibold mb-3">Payment Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">PayPal Integration</span>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Configure
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Stripe Integration</span>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
          <h4 className="text-white font-semibold mb-3">Security</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Two-Factor Authentication</span>
              <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Setup
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">API Keys</span>
              <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
