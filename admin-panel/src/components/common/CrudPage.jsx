import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash, ChevronLeft, ChevronRight, X, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import './CrudPage.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function CrudPage({ 
  title, 
  description, 
  columns = [], 
  formFields,
  data: initialData = [], 
  apiEndpoint,
  addActionLabel = 'Add New' 
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!!apiEndpoint);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({});

  const fields = formFields || columns;

  const loadData = async () => {
    if (!apiEndpoint) {
      setData(initialData);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${apiEndpoint}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData(initialData);
      }
    } catch (e) {
      console.warn(`Failed to fetch ${apiEndpoint}, using fallback:`, e);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiEndpoint]);

  useEffect(() => {
    if (editingData) {
      const initial = {};
      fields.forEach(col => {
        const key = col.toLowerCase().replace(/ /g, '_');
        initial[key] = editingData[key] || '';
      });
      setFormData(initial);
    } else {
      const initial = {};
      fields.forEach(col => {
        const key = col.toLowerCase().replace(/ /g, '_');
        initial[key] = '';
      });
      setFormData(initial);
    }
  }, [editingData, isModalOpen]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (apiEndpoint === 'coupons') {
      try {
        const res = await fetch(`${API_BASE}/coupons`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          toast.success(`Coupon "${formData.code}" created! You can now use it in the Store.`);
          loadData();
          setIsModalOpen(false);
          return;
        }
      } catch (err) {
        toast.error('Failed to create coupon: ' + err.message);
      }
    }

    if (editingData && apiEndpoint === 'orders') {
      try {
        const orderId = editingData.id || editingData.order_id;
        const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: formData.status || 'Delivered',
            tracking_info: formData.tracking_info || 'Dispatched via Express Courier' 
          })
        });
        if (res.ok) {
          toast.success(`Order ${orderId} updated!`);
          loadData();
          setIsModalOpen(false);
          return;
        }
      } catch (err) {
        toast.error('Failed to update order: ' + err.message);
      }
    }

    // Default simulation update
    toast.success(editingData ? 'Successfully updated!' : 'Successfully created!');
    setIsModalOpen(false);
  };

  const filteredData = data.filter(row => {
    if (!searchQuery) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderCellContent = (row, col, colIndex) => {
    const key = col.toLowerCase().replace(/ /g, '_');
    const val = row[key];

    if (key === 'status') {
      const s = String(val || 'Active');
      let badgeClass = 'badge-neutral';
      if (s === 'Delivered' || s === 'Active' || s === 'Completed' || s === 'Success' || s === 'Paid') badgeClass = 'badge-success';
      else if (s === 'Processing' || s === 'Pending' || s === 'Pending (COD)' || s === 'Low Stock') badgeClass = 'badge-warning';
      else if (s === 'Shipped') badgeClass = 'badge-info';
      else if (s === 'Cancelled' || s === 'Out of Stock' || s === 'Failed') badgeClass = 'badge-danger';
      return <span className={`badge ${badgeClass}`}>{s}</span>;
    }

    if (key === 'transaction_id' || key === 'payment_status') {
      if (!val || val === '-') return <span style={{ color: '#94a3b8' }}>-</span>;
      return (
        <span style={{ 
          fontFamily: 'monospace', 
          fontSize: '12px', 
          background: '#f1f5f9', 
          padding: '2px 8px', 
          borderRadius: '4px',
          color: '#0f172a',
          fontWeight: '600'
        }}>
          {String(val)}
        </span>
      );
    }

    if (key === 'gateway' || key === 'method') {
      const isRzp = String(val).toLowerCase().includes('razorpay') || String(val).toLowerCase().includes('upi');
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
          {isRzp && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />}
          {val || '-'}
        </span>
      );
    }

    return (
      <span className={colIndex === 0 ? "font-medium" : ""}>
        {val !== undefined && val !== null ? String(val) : '-'}
      </span>
    );
  };

  return (
    <div className="crud-page">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-h2">{title}</h1>
          <p className="text-small">{description}</p>
        </div>
        <div className="flex gap-4">
          {apiEndpoint && (
            <button className="btn btn-secondary" onClick={loadData} title="Refresh Live Data">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Sync
            </button>
          )}
          {addActionLabel && (
            <button className="btn btn-primary" onClick={() => { setEditingData(null); setIsModalOpen(true); }}>
              <Plus size={18} />
              {addActionLabel}
            </button>
          )}
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`} 
              className="form-input pl-10" 
              style={{ width: '300px', height: '38px', borderRadius: '8px' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="table-actions">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                <th width="60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    Loading real-time records...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr key={row.id || rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {renderCellContent(row, col, colIndex)}
                      </td>
                    ))}
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="icon-btn" 
                          style={{ color: 'var(--color-primary)' }} 
                          title="Edit / Update"
                          onClick={() => { setEditingData(row); setIsModalOpen(true); }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="icon-btn" 
                          style={{ color: '#ef4444' }} 
                          title="Delete"
                          onClick={() => toast.info('Action noted for demo.')}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="empty-state-cell">
                    <div className="empty-state">
                      <div className="empty-icon-wrapper">
                        <Search size={24} />
                      </div>
                      <h3 className="empty-title">No {title.toLowerCase()} found</h3>
                      <p className="empty-desc">There are no records matching your current query.</p>
                      {addActionLabel && (
                        <button className="btn btn-secondary mt-4" onClick={() => { setEditingData(null); setIsModalOpen(true); }}>
                          <Plus size={18} />
                          {addActionLabel}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-pagination">
          <span className="text-small">Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {data.length} entries</span>
          <div className="pagination-controls">
            <button className="icon-btn" disabled><ChevronLeft size={18} /></button>
            <button className="page-btn active">1</button>
            <button className="icon-btn" disabled><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Modal/Drawer for Add/Edit */}
      {isModalOpen && (
        <div className="drawer-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="drawer-header">
                <h2 className="text-h2">{editingData ? `Update ${title}` : (addActionLabel || `Add ${title}`)}</h2>
                <button type="button" className="icon-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="drawer-body">
                <div className="form-section">
                  <h3 className="section-title">Information Details</h3>
                  
                  <div className="grid-2">
                    {fields.map((col, idx) => {
                      const key = col.toLowerCase().replace(/ /g, '_');
                      if (key === 'status') {
                        return (
                          <div className="form-group" key={idx}>
                            <label className="form-label">{col}</label>
                            <select
                              className="form-input"
                              value={formData[key] || 'Processing'}
                              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Active">Active</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        );
                      }
                      return (
                        <div className="form-group" key={idx}>
                          <label className="form-label">{col}</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder={`Enter ${col.toLowerCase()}`} 
                            value={formData[key] || ''}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Details</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
