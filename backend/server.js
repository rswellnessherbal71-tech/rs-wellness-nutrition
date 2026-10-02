import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read data safely
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data.json:', err);
    return { products: [], orders: [], coupons: [], categories: [], customers: [] };
  }
}

// Helper to write data safely
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to data.json:', err);
    return false;
  }
}

// -------------------------------------------------------------
// PRODUCTS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/products', (req, res) => {
  const data = readData();
  res.json(data.products || []);
});

app.get('/api/products/:id', (req, res) => {
  const data = readData();
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const data = readData();
  const newId = data.products.length > 0 ? Math.max(...data.products.map(p => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    name: req.body.name || 'New Product',
    sku: req.body.sku || `HL-PROD-${String(newId).padStart(3, '0')}`,
    cat: req.body.category || req.body.cat || 'Shakes',
    category: req.body.category || req.body.cat || 'Shakes',
    brand: req.body.brand || 'Herbalife Nutrition',
    price: Number(req.body.price) || 999,
    oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : null,
    stock: Number(req.body.stock) || 20,
    status: req.body.status || (Number(req.body.stock) > 10 ? 'Active' : Number(req.body.stock) > 0 ? 'Low Stock' : 'Out of Stock'),
    image: req.body.image || 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=650&q=80',
    rating: req.body.rating || 5.0,
    reviews: req.body.reviews || 0,
    tag: req.body.tag || 'New',
    tagClass: req.body.tagClass || 'badge-bestseller',
    spec: req.body.spec || 'Pure Health & Nutrition Formulation',
    flavors: Array.isArray(req.body.flavors) ? req.body.flavors : (req.body.flavors ? req.body.flavors.split(',').map(f => f.trim()) : ['Standard']),
    desc: req.body.desc || 'Premium certified nutritional wellness supplement.',
    date: new Date().toISOString().split('T')[0]
  };

  data.products.unshift(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const existing = data.products[index];
  const stock = req.body.stock !== undefined ? Number(req.body.stock) : existing.stock;
  
  let computedStatus = req.body.status || existing.status;
  if (req.body.stock !== undefined && !req.body.status) {
    computedStatus = stock > 10 ? 'Active' : stock > 0 ? 'Low Stock' : 'Out of Stock';
  }

  data.products[index] = {
    ...existing,
    ...req.body,
    id,
    cat: req.body.category || req.body.cat || existing.cat,
    category: req.body.category || req.body.cat || existing.category,
    price: req.body.price !== undefined ? Number(req.body.price) : existing.price,
    oldPrice: req.body.oldPrice !== undefined ? (req.body.oldPrice ? Number(req.body.oldPrice) : null) : existing.oldPrice,
    stock,
    status: computedStatus
  };

  writeData(data);
  res.json(data.products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const filtered = data.products.filter(p => p.id !== id);
  if (filtered.length === data.products.length) return res.status(404).json({ error: 'Product not found' });

  data.products = filtered;
  writeData(data);
  res.json({ success: true, message: 'Product deleted' });
});

// -------------------------------------------------------------
// CATEGORIES ENDPOINTS
// -------------------------------------------------------------
app.get('/api/categories', (req, res) => {
  const data = readData();
  res.json(data.categories || []);
});

// -------------------------------------------------------------
// ORDERS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/orders', (req, res) => {
  const data = readData();
  res.json(data.orders || []);
});

app.post('/api/orders', (req, res) => {
  const data = readData();
  const orderNum = 9820 + (data.orders ? data.orders.length + 1 : 1);
  const orderId = `#ORD-${orderNum}`;
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

  const { customer, email, phone, address, items, subtotal, discount, shipping, payment_method, payment_status, transaction_id, payment_gateway } = req.body;
  const totalAmount = (subtotal || 0) - (discount || 0) + (shipping || 0);

  const isPaid = payment_status === 'Paid' || (payment_method && !payment_method.toLowerCase().includes('cash on delivery') && !payment_method.toLowerCase().includes('cod'));
  const txnId = transaction_id || (isPaid ? `pay_rzp_${Math.random().toString(36).substring(2, 9)}` : '-');

  const newOrder = {
    id: `ORD-${orderNum}`,
    order_id: orderId,
    customer: customer || 'Guest Customer',
    email: email || 'customer@example.com',
    phone: phone || '+91 98765 00000',
    address: address || 'Store Delivery Address',
    date: dateStr,
    amount: `₹${Number(totalAmount).toLocaleString('en-IN')}`,
    subtotal: Number(subtotal) || 0,
    discount: Number(discount) || 0,
    shipping: Number(shipping) || 0,
    source: 'Website',
    status: isPaid ? 'Processing' : 'Pending Confirmation',
    payment_status: isPaid ? 'Paid' : 'Pending (COD)',
    payment_method: payment_method || 'Cash on Delivery',
    payment_gateway: payment_gateway || (isPaid ? 'Razorpay PG' : 'Direct COD'),
    transaction_id: txnId,
    tracking_info: 'Preparing for courier dispatch',
    items: items || []
  };

  // If paid online, record in transactions list
  if (isPaid) {
    if (!data.transactions) data.transactions = [];
    data.transactions.unshift({
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      transaction_id: txnId,
      order_id: orderId,
      customer: customer || 'Guest Customer',
      method: payment_method || 'Razorpay (Online)',
      gateway: payment_gateway || 'Razorpay PG',
      amount: `₹${Number(totalAmount).toLocaleString('en-IN')}`,
      status: 'Success',
      date: dateStr
    });
  }

  // Decrement stock for ordered items
  if (Array.isArray(items)) {
    items.forEach(item => {
      const p = data.products.find(prod => prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, p.stock - (item.qty || 1));
        if (p.stock === 0) p.status = 'Out of Stock';
        else if (p.stock <= 10) p.status = 'Low Stock';
      }
    });
  }

  // Add/update customer in customers list
  if (customer) {
    const existingCust = data.customers.find(c => c.phone === phone || c.email === email);
    if (existingCust) {
      existingCust.total_orders = (existingCust.total_orders || 0) + 1;
    } else {
      data.customers.push({
        name: customer,
        place: address ? address.split(',').pop().trim() : 'India',
        email: email || 'customer@example.com',
        phone: phone || '+91 98765 00000',
        address: address || 'Store Delivery Address',
        date_of_birth: '1995-01-01',
        age: 31,
        gender: 'Not Specified',
        total_orders: 1,
        spent: `₹${Number(totalAmount).toLocaleString('en-IN')}`
      });
    }
  }

  data.orders.unshift(newOrder);
  writeData(data);

  res.status(201).json({
    success: true,
    order: newOrder,
    transaction_id: txnId,
    message: 'Order created successfully, payment verified and stock updated!'
  });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const data = readData();
  const orderId = req.params.id;
  const order = data.orders.find(o => o.id === orderId || o.order_id === orderId || o.order_id === `#${orderId}`);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  if (req.body.status) order.status = req.body.status;
  if (req.body.tracking_info) order.tracking_info = req.body.tracking_info;
  if (req.body.payment_status) order.payment_status = req.body.payment_status;

  writeData(data);
  res.json(order);
});

// -------------------------------------------------------------
// PAYMENT INTEGRATION ENDPOINTS (RAZORPAY / GATEWAY DEMO)
// -------------------------------------------------------------
app.get('/api/transactions', (req, res) => {
  const data = readData();
  res.json(data.transactions || []);
});

app.post('/api/transactions', (req, res) => {
  const data = readData();
  if (!data.transactions) data.transactions = [];
  const newTxn = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    transaction_id: req.body.transaction_id || `pay_rzp_${Math.random().toString(36).substring(2, 9)}`,
    order_id: req.body.order_id || '#ORD-DEMO',
    customer: req.body.customer || 'Customer',
    method: req.body.method || 'Razorpay UPI',
    gateway: req.body.gateway || 'Razorpay',
    amount: req.body.amount || '₹1,000',
    status: req.body.status || 'Success',
    date: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  data.transactions.unshift(newTxn);
  writeData(data);
  res.status(201).json(newTxn);
});

app.get('/api/payment-methods', (req, res) => {
  const data = readData();
  res.json(data.payment_methods || []);
});

// Create Gateway Order Token
app.post('/api/payment/create-order', (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  const rzpOrderId = `order_${Math.random().toString(36).substring(2, 11)}`;
  res.json({
    id: rzpOrderId,
    entity: 'order',
    amount: Number(amount) * 100, // in paise
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    status: 'created',
    key: 'rzp_test_rswellness_demo',
    name: 'RS Wellness Nutrition',
    description: 'Authentic Herbalife Nutrition Purchase'
  });
});

// Verify Gateway Signature & Complete Payment
app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, payment_method = 'UPI' } = req.body;
  const paymentId = `pay_${Math.random().toString(36).substring(2, 10)}`;
  res.json({
    success: true,
    transaction_id: paymentId,
    razorpay_order_id: razorpay_order_id || `order_${Math.random().toString(36).substring(2, 10)}`,
    signature: 'valid_hmac_sha256_verified',
    status: 'captured',
    method: payment_method,
    message: 'Payment verified successfully by gateway!'
  });
});

// -------------------------------------------------------------
// COUPONS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/coupons', (req, res) => {
  const data = readData();
  res.json(data.coupons || []);
});

app.post('/api/coupons', (req, res) => {
  const data = readData();
  const newCoupon = {
    code: (req.body.code || '').toUpperCase().trim(),
    discount: req.body.discount || '10%',
    discountRatio: req.body.discountRatio || (parseFloat(req.body.discount) / 100) || 0.10,
    usage_limit: req.body.usage_limit || '500',
    used: '0',
    valid_until: req.body.valid_until || '2026-12-31',
    status: 'Active'
  };

  data.coupons.unshift(newCoupon);
  writeData(data);
  res.status(201).json(newCoupon);
});

// -------------------------------------------------------------
// CUSTOMERS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/customers', (req, res) => {
  const data = readData();
  res.json(data.customers || []);
});

// -------------------------------------------------------------
// DASHBOARD STATS & ANALYTICS
// -------------------------------------------------------------
app.get('/api/dashboard/stats', (req, res) => {
  const data = readData();
  const products = data.products || [];
  const orders = data.orders || [];

  const totalRevenue = orders.reduce((sum, o) => {
    const rawVal = typeof o.amount === 'string' ? parseFloat(o.amount.replace(/[^0-9.]/g, '')) : (o.amount || 0);
    return sum + (isNaN(rawVal) ? 0 : rawVal);
  }, 0);

  const activeProducts = products.filter(p => p.status === 'Active').length;
  const lowStockProducts = products.filter(p => p.status === 'Low Stock' || p.stock <= 10);
  const outOfStockProducts = products.filter(p => p.status === 'Out of Stock' || p.stock === 0);

  res.json({
    totalRevenue,
    totalOrders: orders.length,
    activeProducts,
    totalProducts: products.length,
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    recentOrders: orders.slice(0, 5),
    lowStockList: lowStockProducts,
    categoriesCount: (data.categories || []).length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 RS Wellness Shared Demo API running on http://localhost:${PORT}`);
});
