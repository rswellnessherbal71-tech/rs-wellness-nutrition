import React from 'react';
import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import './Layout.css';

export default function Header({ toggleSidebar }) {
  const location = useLocation();
  
  // Simple breadcrumb logic based on path
  const paths = location.pathname.split('/').filter(p => p);
  
  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Dashboard</Link>
          {paths.map((path, index) => (
            <React.Fragment key={path}>
              <span className="breadcrumb-separator">/</span>
              <span className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`}>
                {path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="header-right">
        {/* Live Storefront Demo Quick Link */}
        <a 
          href="http://localhost:3000/" 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-secondary"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '12.5px', 
            fontWeight: '600',
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: '#f0fdf4',
            color: '#15803d',
            borderColor: '#bbf7d0',
            textDecoration: 'none'
          }}
          title="Open Live RS Wellness Customer Storefront"
        >
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#22c55e',
            display: 'inline-block',
            boxShadow: '0 0 6px #22c55e'
          }}></span>
          <span>View Customer Storefront</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="search-shortcut">⌘K</div>
        </div>
        
        <button className="notification-btn relative" title="Order Notifications">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="header-profile">
          <div className="avatar-small">
            <User size={16} />
          </div>
          <span className="admin-name" style={{ color: '#17201B', display: 'inline-block', marginLeft: '8px' }}>admin@rswellness.com</span>
          <ChevronDown size={16} style={{ color: '#64748B', marginLeft: '4px' }} />
        </div>
      </div>
    </header>
  );
}
