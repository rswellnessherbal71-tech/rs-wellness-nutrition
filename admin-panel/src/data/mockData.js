// Catalog
export const mockCategories = [
  { name: 'Supplements', slug: 'supplements', parent_category: '-', product_count: 145, status: 'Active' },
  { name: 'Herbal Teas', slug: 'herbal-teas', parent_category: '-', product_count: 56, status: 'Active' },
  { name: 'Skincare', slug: 'skincare', parent_category: '-', product_count: 89, status: 'Active' },
  { name: 'Essential Oils', slug: 'essential-oils', parent_category: '-', product_count: 34, status: 'Draft' },
];

export const mockBrands = [
  { logo: 'NV', name: 'NatureVit', product_count: 120, status: 'Active' },
  { logo: 'PH', name: 'PuroHerbs', product_count: 45, status: 'Active' },
  { logo: 'ZL', name: 'ZenLeaf', product_count: 88, status: 'Active' },
];

export const mockAttributes = [
  { name: 'Weight', values: '100g, 250g, 500g, 1kg', used_in: '120 Products' },
  { name: 'Flavor', values: 'Mint, Lemon, Ginger, Plain', used_in: '45 Products' },
  { name: 'Skin Type', values: 'Oily, Dry, Normal, Sensitive', used_in: '89 Products' },
];

// Inventory
export const mockStock = [
  { product: 'Ashwagandha Powder', sku: 'HB-ASH-001', current_stock: 120, status: 'In Stock', updated: '2023-11-15' },
  { product: 'Shilajit Resin', sku: 'HB-SHI-002', current_stock: 45, status: 'In Stock', updated: '2023-11-14' },
  { product: 'Matcha Green Tea', sku: 'HB-MAT-003', current_stock: 8, status: 'Low Stock', updated: '2023-11-15' },
  { product: 'Turmeric Drops', sku: 'HB-TUR-004', current_stock: 0, status: 'Out of Stock', updated: '2023-11-10' },
];

export const mockStockAdjustment = [
  { reference_id: 'ADJ-1001', product: 'Ashwagandha Powder', type: 'Addition', quantity: '+50', date: '2023-11-15' },
  { reference_id: 'ADJ-1002', product: 'Matcha Green Tea', type: 'Damage', quantity: '-2', date: '2023-11-14' },
];

export const mockLowStock = [
  { product: 'Matcha Green Tea', sku: 'HB-MAT-003', current_stock: 8, minimum_stock: 10, status: 'Low Stock' },
  { product: 'Turmeric Drops', sku: 'HB-TUR-004', current_stock: 0, minimum_stock: 15, status: 'Out of Stock' },
];

export const mockStockHistory = [
  { date: '2023-11-15 10:30 AM', product: 'Ashwagandha Powder', type: 'Sale', quantity: '-1', user: 'System' },
  { date: '2023-11-15 09:15 AM', product: 'Ashwagandha Powder', type: 'Restock', quantity: '+50', user: 'Admin' },
];

// Orders
export const mockOnlineOrders = [
  { order_id: '#ORD-9821', customer: 'Arjun Kumar', date: '2023-11-15', amount: '₹1,250', source: 'Website', status: 'Delivered' },
  { order_id: '#ORD-9822', customer: 'Priya Singh', date: '2023-11-15', amount: '₹890', source: 'Mobile App', status: 'Processing' },
  { order_id: '#ORD-9823', customer: 'Rahul Sharma', date: '2023-11-14', amount: '₹2,400', source: 'Website', status: 'Shipped' },
];

export const mockDirectOrders = [
  { order_id: '#DIR-1050', customer: 'Anita Desai', date: '2023-11-14', amount: '₹450', salesperson: 'Admin', status: 'Completed' },
  { order_id: '#DIR-1051', customer: 'Walk-in Customer', date: '2023-11-15', amount: '₹1,100', salesperson: 'Sarah', status: 'Completed' },
];

export const mockOrdersProcessing = [
  { order_id: '#ORD-9822', customer: 'Priya Singh', date: '2023-11-15', amount: '₹890', status: 'Processing' },
  { order_id: '#ORD-9825', customer: 'Vikram Patel', date: '2023-11-15', amount: '₹1,100', status: 'Processing' },
];

export const mockOrdersShipped = [
  { order_id: '#ORD-9823', customer: 'Rahul Sharma', date: '2023-11-14', amount: '₹2,400', tracking_info: 'BlueDart - BD9827361' },
  { order_id: '#ORD-9820', customer: 'Sneha Reddy', date: '2023-11-13', amount: '₹3,200', tracking_info: 'Delhivery - DL882731' },
];

export const mockOrdersDelivered = [
  { order_id: '#ORD-9821', customer: 'Arjun Kumar', date: '2023-11-15', amount: '₹1,250', delivered_on: '2023-11-16 02:30 PM' },
  { order_id: '#ORD-9815', customer: 'Amit Shah', date: '2023-11-10', amount: '₹5,600', delivered_on: '2023-11-12 11:00 AM' },
];

export const mockOrdersCancelled = [
  { order_id: '#ORD-9824', customer: 'Anita Desai', date: '2023-11-14', amount: '₹450', reason: 'Customer Request' },
  { order_id: '#ORD-9810', customer: 'Manoj Tiwari', date: '2023-11-05', amount: '₹1,200', reason: 'Payment Failed' },
];

export const mockOrdersReturns = [
  { order_id: '#ORD-9750', customer: 'Riya Gupta', amount: '₹1,500', return_reason: 'Damaged Item', refund_status: 'Processed' },
  { order_id: '#ORD-9742', customer: 'Karan Mehra', amount: '₹800', return_reason: 'Wrong Item Sent', refund_status: 'Pending' },
];

// Customers
export const mockCustomersAll = [
  { name: 'Arjun Kumar', email: 'arjun@example.com', phone: '+91 9876543210', total_orders: 5, spent: '₹4,500' },
  { name: 'Priya Singh', email: 'priya@example.com', phone: '+91 9876543211', total_orders: 2, spent: '₹1,500' },
  { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543212', total_orders: 12, spent: '₹15,400' },
];

export const mockCustomerGroups = [
  { group_name: 'VIP Customers', members: 145, discount: '10%', status: 'Active' },
  { group_name: 'New Registrations', members: 890, discount: '5%', status: 'Active' },
  { group_name: 'Wholesale', members: 24, discount: '25%', status: 'Active' },
];

export const mockCustomerAddresses = [
  { customer: 'Arjun Kumar', address_line_1: '123 MG Road, Apt 4B', city: 'Bangalore', state: 'Karnataka', zip: '560001' },
  { customer: 'Priya Singh', address_line_1: '45 Park Street', city: 'Kolkata', state: 'West Bengal', zip: '700016' },
];

// Cart & Wishlist
export const mockAbandonedCarts = [
  { customer: 'Neha Verma', items: 3, cart_value: '₹2,450', date: '2023-11-15', status: 'Pending Recovery' },
  { customer: 'Guest User', items: 1, cart_value: '₹899', date: '2023-11-14', status: 'Lost' },
];

export const mockWishlists = [
  { customer: 'Priya Singh', product: 'Premium Matcha Green Tea', price: '₹899', added_date: '2023-11-10' },
  { customer: 'Rahul Sharma', product: 'Ashwagandha Powder', price: '₹599', added_date: '2023-11-12' },
];

// Coupons & Offers
export const mockCoupons = [
  { code: 'WELCOME10', discount: '10%', usage_limit: '1000', used: '450', valid_until: '2023-12-31', status: 'Active' },
  { code: 'DIWALI20', discount: '20%', usage_limit: '500', used: '500', valid_until: '2023-11-15', status: 'Expired' },
];

export const mockDiscountOffers = [
  { offer_name: 'Buy 2 Get 1 Free on Teas', type: 'BOGO', value: '1 Free Item', active_duration: 'Nov 1 - Nov 30' },
  { offer_name: 'Flat ₹500 off on Orders above ₹2000', type: 'Cart Discount', value: '₹500', active_duration: 'Nov 15 - Nov 20' },
];

export const mockProductOffers = [
  { product: 'Himalayan Shilajit Resin', offer_price: '₹1,299', 'discount_%': '13%', ends_in: '2 Days' },
];

// Payments
export const mockTransactions = [
  { transaction_id: 'TXN-882910', order_id: '#ORD-9821', customer: 'Arjun Kumar', method: 'UPI', amount: '₹1,250', date: '2023-11-15 10:05 AM' },
  { transaction_id: 'TXN-882911', order_id: '#ORD-9822', customer: 'Priya Singh', method: 'Credit Card', amount: '₹890', date: '2023-11-15 11:30 AM' },
];

export const mockRefunds = [
  { refund_id: 'REF-1092', order_id: '#ORD-9750', customer: 'Riya Gupta', amount: '₹1,500', status: 'Completed' },
];

export const mockPaymentMethods = [
  { method: 'Razorpay', provider: 'Razorpay Software', transaction_fee: '2%', status: 'Active' },
  { method: 'Stripe', provider: 'Stripe Inc.', transaction_fee: '2.9% + ₹30', status: 'Inactive' },
  { method: 'Cash on Delivery', provider: 'Internal', transaction_fee: '0%', status: 'Active' },
];

export const mockFailedPayments = [
  { transaction_id: 'TXN-882905', customer: 'Manoj Tiwari', amount: '₹1,200', reason: 'Insufficient Funds', date: '2023-11-15 08:20 AM' },
];

// Users & Roles
export const mockAdminUsers = [
  { name: 'Sarah Jenkins', email: 'sarah@herbalcare.com', role: 'Super Admin', last_login: 'Today 09:00 AM', status: 'Active' },
  { name: 'Rohan Das', email: 'rohan@herbalcare.com', role: 'Inventory Manager', last_login: 'Yesterday 05:30 PM', status: 'Active' },
];

export const mockRoles = [
  { role_name: 'Super Admin', users_assigned: 2, created_on: '2023-01-10' },
  { role_name: 'Inventory Manager', users_assigned: 3, created_on: '2023-02-15' },
  { role_name: 'Support Agent', users_assigned: 5, created_on: '2023-03-20' },
];

export const mockPermissions = [
  { module: 'Products', view: '✓', add: '✓', edit: '✓', delete: '✓' },
  { module: 'Orders', view: '✓', add: '✕', edit: '✓', delete: '✕' },
  { module: 'Customers', view: '✓', add: '✓', edit: '✓', delete: '✕' },
];

// Reports (usually aggregated data, but simulating tabular report outputs)
export const mockSalesReport = [
  { date: '2023-11-15', orders: 45, gross_sales: '₹45,000', discounts: '₹2,500', net_sales: '₹42,500' },
  { date: '2023-11-14', orders: 52, gross_sales: '₹56,200', discounts: '₹3,100', net_sales: '₹53,100' },
];

export const mockProductReport = [
  { product: 'Ashwagandha Powder', sold_qty: 145, revenue: '₹86,855', views: 2450, conversion: '5.9%' },
  { product: 'Shilajit Resin', sold_qty: 82, revenue: '₹122,918', views: 3100, conversion: '2.6%' },
];

export const mockCustomerReport = [
  { date: '2023-11', new_customers: 245, returning: 560, avg_spend: '₹1,850' },
  { date: '2023-10', new_customers: 310, returning: 490, avg_spend: '₹1,720' },
];

export const mockInventoryReport = [
  { category: 'Supplements', total_items: 4500, total_value: '₹34,50,000', out_of_stock: 12 },
  { category: 'Skincare', total_items: 2100, total_value: '₹12,80,000', out_of_stock: 5 },
];

export const mockPaymentReport = [
  { method: 'UPI', transactions: 1450, total_volume: '₹18,50,000', fees: '₹0', net_amount: '₹18,50,000' },
  { method: 'Credit Card', transactions: 890, total_volume: '₹25,40,000', fees: '₹50,800', net_amount: '₹24,89,200' },
];

// Settings
export const mockGeneralSettings = [
  { setting: 'Store Name', value: 'HerbalCare Naturals', last_updated: '2023-01-15' },
  { setting: 'Contact Email', value: 'support@herbalcare.com', last_updated: '2023-01-15' },
  { setting: 'Timezone', value: 'Asia/Kolkata (IST)', last_updated: '2023-01-15' },
];

export const mockStoreSettings = [
  { setting: 'Currency', value: 'INR (₹)', last_updated: '2023-01-15' },
  { setting: 'Weight Unit', value: 'Grams (g)', last_updated: '2023-01-15' },
  { setting: 'Order Prefix', value: '#ORD-', last_updated: '2023-01-15' },
];

export const mockPaymentSettings = [
  { setting: 'Razorpay Live Key', value: 'rzp_live_**********', last_updated: '2023-02-20' },
  { setting: 'Accept Cash on Delivery', value: 'Yes', last_updated: '2023-01-15' },
];

export const mockTaxSettings = [
  { region: 'India - All States', tax_name: 'GST', 'rate_(%)': '18%', status: 'Active' },
  { region: 'India - Supplements', tax_name: 'GST (Exempt/Lower)', 'rate_(%)': '5%', status: 'Active' },
];

export const mockEmailSettings = [
  { template_name: 'Order Confirmation', subject: 'Your HerbalCare Order {{order_id}} is Confirmed!', status: 'Active' },
  { template_name: 'Shipping Update', subject: 'Great news! Your order is on the way.', status: 'Active' },
  { template_name: 'Password Reset', subject: 'Reset your HerbalCare password', status: 'Active' },
];

export const mockSmsSettings = [
  { template_name: 'Order Placed', message: 'Hi {{name}}, your order {{order_id}} is confirmed. Track here: {{link}}', status: 'Active' },
  { template_name: 'Out for Delivery', message: 'Hi {{name}}, your order is out for delivery today. PIN: {{pin}}', status: 'Active' },
];

// System
export const mockActivityLogs = [
  { 'date/time': '2023-11-15 10:45 AM', user: 'Sarah Jenkins', action: 'Updated Product Price', module: 'Products', ip_address: '192.168.1.45' },
  { 'date/time': '2023-11-15 09:30 AM', user: 'Rohan Das', action: 'Added Stock', module: 'Inventory', ip_address: '192.168.1.102' },
];

export const mockLoginLogs = [
  { 'date/time': '2023-11-15 09:00 AM', user: 'Sarah Jenkins', ip_address: '192.168.1.45', browser: 'Chrome 118.0 - Win11', status: 'Success' },
  { 'date/time': '2023-11-15 08:15 AM', user: 'Rohan Das', ip_address: '192.168.1.102', browser: 'Safari 16.0 - macOS', status: 'Success' },
  { 'date/time': '2023-11-14 11:30 PM', user: 'Unknown', ip_address: '45.22.11.99', browser: 'Firefox 115.0 - Linux', status: 'Failed' },
];

export const mockNotifications = [
  { 'date/time': '2023-11-15 11:00 AM', type: 'Stock Alert', message: 'Matcha Green Tea stock is below minimum threshold.', status: 'Unread' },
  { 'date/time': '2023-11-15 10:00 AM', type: 'System', message: 'Database backup completed successfully.', status: 'Read' },
];

export const mockBackup = [
  { date: '2023-11-15 02:00 AM', file_name: 'backup_db_20231115.sql.gz', size: '45 MB', status: 'Completed', actions: 'Download' },
  { date: '2023-11-14 02:00 AM', file_name: 'backup_db_20231114.sql.gz', size: '44.8 MB', status: 'Completed', actions: 'Download' },
];
