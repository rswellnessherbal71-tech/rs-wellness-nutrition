import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash, ChevronLeft, ChevronRight, X, Upload, RefreshCw
} from 'lucide-react';
import { mockAttributes } from '../data/mockData';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Shakes',
    brand: 'Herbalife Nutrition',
    price: '',
    oldPrice: '',
    stock: '',
    status: 'Active',
    image: '',
    desc: '',
    spec: '',
    tag: 'Bestseller'
  });

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getProducts();
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        sku: editingProduct.sku || '',
        category: editingProduct.category || editingProduct.cat || 'Shakes',
        brand: editingProduct.brand || 'Herbalife Nutrition',
        price: editingProduct.price || '',
        oldPrice: editingProduct.oldPrice || '',
        stock: editingProduct.stock !== undefined ? editingProduct.stock : '',
        status: editingProduct.status || 'Active',
        image: editingProduct.image || '',
        desc: editingProduct.desc || '',
        spec: editingProduct.spec || '',
        tag: editingProduct.tag || ''
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: 'Shakes',
        brand: 'Herbalife Nutrition',
        price: '',
        oldPrice: '',
        stock: '',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=650&q=80',
        desc: '',
        spec: '',
        tag: 'Bestseller'
      });
    }
  }, [editingProduct, isModalOpen]);

  const activeAttribute = mockAttributes.find(attr => attr.name === selectedAttribute);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
        toast.success(`Updated "${formData.name}" successfully! Live store updated.`);
      } else {
        await api.createProduct(formData);
        toast.success(`Added new product "${formData.name}"! Live store updated.`);
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      toast.error('Failed to save product: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.deleteProduct(id);
      toast.info(`Deleted "${name}" from catalog.`);
      loadProducts();
    } catch (err) {
      toast.error('Failed to delete product: ' + err.message);
    }
  };

  const getStatusBadge = (status, stock) => {
    if (stock === 0 || status === 'Out of Stock') {
      return <span className="badge badge-danger">Out of Stock</span>;
    }
    if (stock <= 10 || status === 'Low Stock') {
      return <span className="badge badge-warning">Low Stock ({stock})</span>;
    }
    if (status === 'Draft') {
      return <span className="badge badge-neutral">Draft</span>;
    }
    return <span className="badge badge-success">Active ({stock})</span>;
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const pCat = p.category || p.cat;
    const matchesCategory = filterCategory === 'All' || pCat === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category || p.cat).filter(Boolean))];

  return (
    <div className="products-page">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-h2">Products Catalog</h1>
          <p className="text-small">Live synced inventory across Storefront & Backoffice.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary" onClick={loadProducts} title="Refresh catalog from API">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-toolbar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products by name, SKU, brand..." 
              className="form-input pl-10" 
              style={{ width: '320px', height: '38px', borderRadius: '8px' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="table-actions flex gap-2">
            <select 
              className="form-input" 
              style={{ height: '38px', borderRadius: '8px', padding: '0 12px' }}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>Category: {c}</option>)}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th width="40">
                  <input type="checkbox" onChange={toggleSelectAll} checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0} />
                </th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>MRP Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th width="90">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ color: '#64748b' }}>Loading live product catalog...</div>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected-row' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                      />
                    </td>
                    <td>
                      <div className="product-cell">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=100&q=80'} 
                          alt={product.name} 
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                        />
                        <div>
                          <span className="product-name font-medium">{product.name}</span>
                          {product.tag && <span style={{ fontSize: '11px', color: '#15803d', display: 'block' }}>{product.tag}</span>}
                        </div>
                      </div>
                    </td>
                    <td><span className="text-small font-medium">{product.sku}</span></td>
                    <td>{product.category || product.cat}</td>
                    <td>{product.brand || 'Herbalife'}</td>
                    <td>
                      <div>
                        <span className="font-medium">₹{Number(product.price).toLocaleString('en-IN')}</span>
                        {product.oldPrice && <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#94a3b8', marginLeft: '6px' }}>₹{product.oldPrice}</span>}
                      </div>
                    </td>
                    <td><strong>{product.stock}</strong></td>
                    <td>{getStatusBadge(product.status, product.stock)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="icon-btn" 
                          style={{ color: 'var(--color-primary)' }} 
                          title="Edit Product"
                          onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="icon-btn" 
                          style={{ color: '#ef4444' }} 
                          title="Delete Product"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <h3 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>No products found</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>Try changing the search keyword or clear filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-pagination">
          <span className="text-small">Showing {filteredProducts.length} of {products.length} products</span>
          <div className="pagination-controls">
            <button className="icon-btn" disabled><ChevronLeft size={18} /></button>
            <button className="page-btn active">1</button>
            <button className="icon-btn" disabled><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Product Drawer Modal */}
      {isModalOpen && (
        <div className="drawer-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSaveProduct}>
              <div className="drawer-header">
                <h2 className="text-h2">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button type="button" className="icon-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="drawer-body">
                <div className="form-section">
                  <h3 className="section-title">Product Information</h3>
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      placeholder="e.g. Formula 1 Nutritional Shake Mix" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">SKU</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. HL-F1-001" 
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Brand</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Herbalife Nutrition" 
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Category *</label>
                      <select 
                        className="form-input"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Shakes">Shakes</option>
                        <option value="Teas & Beverages">Teas & Beverages</option>
                        <option value="Sports Nutrition">Sports Nutrition</option>
                        <option value="Targeted Health">Targeted Health</option>
                        <option value="Ayurveda">Ayurveda</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Product Tag / Badge</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Bestseller, Energy Boost, Hot Deal" 
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Selling Price (₹) *</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        required
                        placeholder="e.g. 2385" 
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Original MRP Price (₹)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="e.g. 2650" 
                        value={formData.oldPrice}
                        onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Available Inventory Stock *</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        required
                        placeholder="e.g. 50" 
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-input"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section mt-6">
                  <h3 className="section-title">Product Image URL</h3>
                  <div className="form-group">
                    <input 
                      type="url" 
                      className="form-input" 
                      placeholder="https://images.unsplash.com/..." 
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                    {formData.image && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={formData.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-section mt-6">
                  <h3 className="section-title">Description & Specifications</h3>
                  <div className="form-group">
                    <label className="form-label">Key Specification</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 9g High Quality Protein • 18 Essential Micronutrients (500g)" 
                      value={formData.spec}
                      onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Detailed Description</label>
                    <textarea 
                      className="form-input" 
                      rows={4} 
                      placeholder="Write a detailed product description..." 
                      style={{ height: 'auto', padding: '0.75rem' }}
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
