// Admin configuration
export const ADMIN_CONFIG = {
  // قائمة الإيميلات التي لها صلاحيات Admin
  // لإضافة مستخدم أدمن جديد، أضف إيميله هنا
  adminEmails: [
    "qyosk727@gmail.com",        // المدير الأساسي
    "len@admin.com",           // مدير المطور
    "superadmin@luxury-watches.com",  // مدير عام
    // "your-email@example.com"  // أضف إيميلك هنا لتصبح أدمن
    // يمكنك إضافة المزيد من الإيميلات هنا
  ],
  
  // وظيفة للتحقق من كون المستخدم أدمن
  isAdmin: (email) => {
    return ADMIN_CONFIG.adminEmails.includes(email?.toLowerCase());
  },
  
  // إعدادات الأدمن الافتراضية
  defaultAdminRole: {
    role: 'admin',
    isAdmin: true,
    permissions: [
      'manage_products',
      'manage_users', 
      'manage_orders',
      'view_analytics',
      'system_settings'
    ]
  },
  
  // إعدادات المستخدم العادي الافتراضية
  defaultUserRole: {
    role: 'user',
    isAdmin: false,
    permissions: [
      'view_products',
      'place_orders',
      'view_own_profile',
      'view_own_orders'
    ]
  }
};

export default ADMIN_CONFIG;
