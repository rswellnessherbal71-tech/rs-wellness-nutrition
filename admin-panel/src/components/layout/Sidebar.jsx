import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingCart, 
  Users, 
  Heart,
  Tag,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Leaf
} from 'lucide-react';
import './Layout.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { 
    id: 'catalog', label: 'Catalog', icon: Package, 
    children: [
      { id: 'categories', label: 'Categories', path: '/categories' },
      { id: 'brands', label: 'Brands', path: '/brands' },
      { id: 'attributes', label: 'Product Attributes', path: '/attributes' },
      { id: 'products', label: 'Products', path: '/products' },
    ]
  },
  {
    id: 'customers', label: 'Customers', icon: Users,
    children: [
      { id: 'online-customers', label: 'Online Customers', path: '/customers/online' },
      { id: 'direct-customers', label: 'Direct Customers', path: '/customers/direct' },
    ]
  },
  { 
    id: 'inventory', label: 'Inventory', icon: Boxes, 
    children: [
      { id: 'stock', label: 'Stock Management', path: '/inventory/stock' },
      { id: 'adjustment', label: 'Stock Adjustment', path: '/inventory/adjustment' },
      { id: 'low-stock', label: 'Low Stock', path: '/inventory/low-stock' },
      { id: 'history', label: 'Stock History', path: '/inventory/history' },
    ]
  },
  {
    id: 'orders', label: 'Orders', icon: ShoppingCart,
    children: [
      { id: 'online-orders', label: 'Online Orders', path: '/orders/online' },
      { id: 'direct-orders', label: 'Direct Orders', path: '/orders/direct' },
      { id: 'processing', label: 'Processing', path: '/orders/processing' },
      { id: 'shipped', label: 'Shipped', path: '/orders/shipped' },
      { id: 'delivered', label: 'Delivered', path: '/orders/delivered' },
      { id: 'cancelled', label: 'Cancelled', path: '/orders/cancelled' },
      { id: 'returns', label: 'Returns & Refunds', path: '/orders/returns' },
    ]
  },

  {
    id: 'cart', label: 'Cart & Wishlist', icon: Heart,
    children: [
      { id: 'abandoned', label: 'Abandoned Carts', path: '/cart/abandoned' },
      { id: 'wishlists', label: 'Wishlists', path: '/cart/wishlists' },
    ]
  },
  {
    id: 'coupons', label: 'Coupons & Offers', icon: Tag,
    children: [
      { id: 'coupons-list', label: 'Coupons', path: '/offers/coupons' },
      { id: 'discount', label: 'Discount Offers', path: '/offers/discount' },
      { id: 'product-offers', label: 'Product Offers', path: '/offers/products' },
    ]
  },
  {
    id: 'payments', label: 'Payments', icon: CreditCard,
    children: [
      { id: 'transactions', label: 'Transactions', path: '/payments/transactions' },
      { id: 'refunds', label: 'Refunds', path: '/payments/refunds' },
      { id: 'methods', label: 'Payment Methods', path: '/payments/methods' },
      { id: 'failed', label: 'Failed Payments', path: '/payments/failed' },
    ]
  },
  {
    id: 'users', label: 'Users & Roles', icon: ShieldCheck,
    children: [
      { id: 'admin-users', label: 'Admin Users', path: '/users/admins' },
      { id: 'roles', label: 'Roles', path: '/users/roles' },
      { id: 'permissions', label: 'Permissions', path: '/users/permissions' },
    ]
  },
  {
    id: 'reports', label: 'Reports', icon: BarChart3,
    children: [
      { id: 'sales-report', label: 'Sales Report', path: '/reports/sales' },
      { id: 'product-report', label: 'Product Report', path: '/reports/products' },
      { id: 'customer-report', label: 'Customer Report', path: '/reports/customers' },
      { id: 'inventory-report', label: 'Inventory Report', path: '/reports/inventory' },
      { id: 'payment-report', label: 'Payment Report', path: '/reports/payments' },
    ]
  },
  {
    id: 'system', label: 'System', icon: LayoutDashboard,
    children: [
      { id: 'activity-logs', label: 'Activity Logs', path: '/system/activity' },
      { id: 'login-logs', label: 'Login Logs', path: '/system/login' },
      { id: 'notifications', label: 'Notifications', path: '/system/notifications' },
      { id: 'backup', label: 'Backup', path: '/system/backup' },
    ]
  },
];

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isActive = (path, children) => {
    if (path && location.pathname === path) return true;
    if (children && children.some(c => location.pathname.startsWith(c.path))) return true;
    return false;
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <Leaf className="logo-icon" size={28} />
          {!isCollapsed && <span className="logo-text">RS Wellness</span>}
        </div>
      </div>
      
      <div className="sidebar-nav-container">
        <nav className="sidebar-nav">
          <ul>
            {navItems.map(item => {
              const active = isActive(item.path, item.children);
              const isExpanded = expandedItems[item.id] || active;
              
              return (
                <li key={item.id} className="nav-item">
                  {item.path ? (
                    <NavLink to={item.path} className={`nav-link ${active ? 'active' : ''}`} title={isCollapsed ? item.label : ''}>
                      <item.icon size={20} className="nav-icon" />
                      {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    </NavLink>
                  ) : (
                    <div 
                      className={`nav-link has-children ${active ? 'active-parent' : ''}`}
                      onClick={() => !isCollapsed && toggleExpand(item.id)}
                      title={isCollapsed ? item.label : ''}
                    >
                      <item.icon size={20} className="nav-icon" />
                      {!isCollapsed && (
                        <>
                          <span className="nav-label">{item.label}</span>
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </>
                      )}
                    </div>
                  )}
                  
                  {item.children && !isCollapsed && (
                    <ul className={`submenu ${isExpanded ? 'expanded' : ''}`}>
                      {item.children.map(child => (
                        <li key={child.id}>
                          <NavLink to={child.path} className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="admin-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="admin-info">
              <span className="admin-name">Sarah Jenkins</span>
              <span className="admin-role">Super Admin</span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
