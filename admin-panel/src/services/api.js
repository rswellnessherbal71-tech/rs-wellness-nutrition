const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const api = {
  // Products
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (e) {
      console.warn('API getProducts fallback:', e);
      return null;
    }
  },

  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  },

  async updateProduct(id, productData) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  },

  // Orders
  async getOrders() {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    } catch (e) {
      console.warn('API getOrders fallback:', e);
      return null;
    }
  },

  async updateOrderStatus(id, status, tracking_info) {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, tracking_info }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  },

  // Coupons
  async getCoupons() {
    try {
      const res = await fetch(`${API_BASE}/coupons`);
      if (!res.ok) throw new Error('Failed to fetch coupons');
      return await res.json();
    } catch (e) {
      console.warn('API getCoupons fallback:', e);
      return null;
    }
  },

  async createCoupon(couponData) {
    const res = await fetch(`${API_BASE}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(couponData),
    });
    if (!res.ok) throw new Error('Failed to create coupon');
    return await res.json();
  },

  // Customers
  async getCustomers() {
    try {
      const res = await fetch(`${API_BASE}/customers`);
      if (!res.ok) throw new Error('Failed to fetch customers');
      return await res.json();
    } catch (e) {
      console.warn('API getCustomers fallback:', e);
      return null;
    }
  },

  // Dashboard Stats
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`);
      if (!res.ok) throw new Error('Failed to fetch dashboard stats');
      return await res.json();
    } catch (e) {
      console.warn('API getDashboardStats fallback:', e);
      return null;
    }
  },
};
