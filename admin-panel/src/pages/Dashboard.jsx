import React, { useState, useEffect } from 'react';
import { 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import './Dashboard.css';

const defaultRevenueData = [
  { name: 'Jan', revenue: 400000 },
  { name: 'Feb', revenue: 300000 },
  { name: 'Mar', revenue: 500000 },
  { name: 'Apr', revenue: 450000 },
  { name: 'May', revenue: 600000 },
  { name: 'Jun', revenue: 550000 },
  { name: 'Jul', revenue: 700000 },
];

const defaultOrdersData = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 15 },
  { name: 'Wed', orders: 18 },
  { name: 'Thu', orders: 14 },
  { name: 'Fri', orders: 20 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 22 },
];

const categoryData = [
  { name: 'Shakes', value: 450 },
  { name: 'Teas & Drinks', value: 320 },
  { name: 'Sports Nutrition', value: 210 },
  { name: 'Targeted Health', value: 280 },
];

const COLORS = ['#166534', '#84CC16', '#D97706', '#2563EB'];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 12465,
    totalOrders: 3,
    activeProducts: 12,
    totalProducts: 12,
    lowStockCount: 2,
    outOfStockCount: 1,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    const data = await api.getDashboardStats();
    if (data) {
      setStats(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const kpis = [
    { 
      id: 1, 
      title: 'Total Revenue', 
      value: `₹${Number(stats.totalRevenue || 0).toLocaleString('en-IN')}`, 
      change: 14.2, 
      isUp: true, 
      icon: IndianRupee, 
      color: 'primary' 
    },
    { 
      id: 2, 
      title: 'Total Orders', 
      value: String(stats.totalOrders || 0), 
      change: 18.5, 
      isUp: true, 
      icon: ShoppingBag, 
      color: 'success' 
    },
    { 
      id: 3, 
      title: 'Active Products', 
      value: String(stats.activeProducts || 0), 
      change: 0, 
      isUp: true, 
      icon: Package, 
      color: 'info' 
    },
    { 
      id: 4, 
      title: 'Low Stock Alerts', 
      value: String(stats.lowStockCount || 0), 
      change: stats.lowStockCount > 0 ? 5.6 : 0, 
      isUp: false, 
      icon: AlertTriangle, 
      color: 'danger' 
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-h2">Executive Dashboard</h1>
          <p className="text-small">Live store analytics & real-time order stream from RS Wellness Storefront.</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="btn btn-secondary" 
            onClick={loadDashboardData}
            title="Refresh metrics"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Live Sync
          </button>
          <div className="date-picker-placeholder">
            Live Stream (October 2026)
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map(kpi => (
          <div key={kpi.id} className="kpi-card card">
            <div className="kpi-header">
              <div className={`kpi-icon-wrapper bg-${kpi.color}-light text-${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="kpi-body">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.value}</div>
            </div>
            <div className="kpi-footer">
              <span className={`kpi-change ${kpi.isUp ? 'text-success' : 'text-danger'}`}>
                <ArrowUpRight size={16} />
                {kpi.change}%
              </span>
              <span className="kpi-comparison">live realtime tracking</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid-main">
        <div className="chart-card card col-span-2">
          <div className="chart-header">
            <h3 className="text-h3">Store Revenue Trend</h3>
          </div>
          <div className="chart-body" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={defaultRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#166534" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="text-h3">Catalog Distribution</h3>
          </div>
          <div className="chart-body" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="legend-text">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="charts-grid-secondary mt-6">
        <div className="chart-card card">
          <div className="chart-header">
            <h3 className="text-h3">Weekly Order Volume</h3>
          </div>
          <div className="chart-body" style={{ height: '250px' }}>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defaultOrdersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="orders" fill="#15803d" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card card">
          <div className="chart-header flex justify-between items-center">
            <h3 className="text-h3">Recent Online Orders</h3>
            <Link to="/orders/online" className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', textDecoration: 'none' }}>
              View All Orders
            </Link>
          </div>
          <div className="recent-orders-list">
            {stats.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order, idx) => (
                <div key={order.id || idx} className="recent-order-item">
                  <div className="order-info">
                    <span className="order-id">{order.order_id || `#ORD-982${idx}`}</span>
                    <span className="order-customer">{order.customer || 'Customer'}</span>
                  </div>
                  <div className="order-status">
                    <span className={`badge badge-${order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : 'warning'}`}>
                      {order.status || 'Processing'}
                    </span>
                    <span className="order-amount">{order.amount || '₹2,385'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', fontSize: '13px' }}>
                No recent orders yet. Place an order on the Storefront to see it here!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
