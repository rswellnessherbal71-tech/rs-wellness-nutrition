import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import CrudPage from './components/common/CrudPage';
import Login from './pages/Login';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all mock data for fallback routes
import {
  mockCategories, mockBrands, mockAttributes,
  mockStock, mockStockAdjustment, mockLowStock, mockStockHistory,
  mockOnlineOrders, mockDirectOrders, mockOrdersProcessing, mockOrdersShipped, mockOrdersDelivered, mockOrdersCancelled, mockOrdersReturns,
  mockCustomersAll, mockCustomerGroups, mockCustomerAddresses,
  mockAbandonedCarts, mockWishlists,
  mockCoupons, mockDiscountOffers, mockProductOffers,
  mockTransactions, mockRefunds, mockPaymentMethods, mockFailedPayments,
  mockAdminUsers, mockRoles, mockPermissions,
  mockSalesReport, mockProductReport, mockCustomerReport, mockInventoryReport, mockPaymentReport,
  mockGeneralSettings, mockStoreSettings, mockPaymentSettings, mockTaxSettings, mockEmailSettings, mockSmsSettings,
  mockActivityLogs, mockLoginLogs, mockNotifications, mockBackup
} from './data/mockData';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          
          {/* Catalog */}
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<CrudPage title="Categories" description="Manage product categories and sub-categories." columns={['Name', 'Slug', 'Parent Category', 'Product Count', 'Status']} data={mockCategories} addActionLabel="Add Category" />} />
          <Route path="brands" element={<CrudPage title="Brands" description="Manage product brands." columns={['Logo', 'Name', 'Product Count', 'Status']} data={mockBrands} addActionLabel="Add Brand" />} />
          <Route path="attributes" element={<CrudPage title="Product Attributes" description="Manage product variations and attributes." columns={['Name', 'Values', 'Used In']} data={mockAttributes} addActionLabel="Add Attribute" />} />
          
          {/* Inventory */}
          <Route path="inventory/stock" element={<CrudPage title="Stock Management" description="Overview of inventory levels for all products." columns={['Product', 'SKU', 'Current Stock', 'Status', 'Updated']} data={mockStock} addActionLabel="Update Stock" />} />
          <Route path="inventory/adjustment" element={<CrudPage title="Stock Adjustment" description="Record stock adjustments manually." columns={['Reference ID', 'Product', 'Type', 'Quantity', 'Date']} data={mockStockAdjustment} addActionLabel="Add Adjustment" />} />
          <Route path="inventory/low-stock" element={<CrudPage title="Low Stock Products" description="Products that need restocking immediately." columns={['Product', 'SKU', 'Current Stock', 'Minimum Stock', 'Status']} data={mockLowStock} addActionLabel="Restock All" />} />
          <Route path="inventory/history" element={<CrudPage title="Stock History" description="Historical log of all stock movements." columns={['Date', 'Product', 'Type', 'Quantity', 'User']} data={mockStockHistory} addActionLabel="Export History" />} />

          {/* Orders */}
          <Route path="orders/online" element={<CrudPage title="Online Orders" description="Live orders placed from the RS Wellness Customer Storefront." columns={['Order ID', 'Customer', 'Phone', 'Date', 'Amount', 'Payment Method', 'Status', 'Tracking Info']} data={mockOnlineOrders} apiEndpoint="orders" addActionLabel={null} />} />
          <Route path="orders/direct" element={<CrudPage title="Direct Orders" description="View and manage manual/walk-in orders." columns={['Order ID', 'Customer', 'Date', 'Amount', 'Salesperson', 'Status']} data={mockDirectOrders} addActionLabel="Create Direct Order" />} />
          <Route path="orders/processing" element={<CrudPage title="Processing Orders" description="Orders currently being processed." columns={['Order ID', 'Customer', 'Date', 'Amount', 'Status']} data={mockOrdersProcessing} apiEndpoint="orders" addActionLabel="Create Order" />} />
          <Route path="orders/shipped" element={<CrudPage title="Shipped Orders" description="Orders that have been shipped." columns={['Order ID', 'Customer', 'Date', 'Amount', 'Tracking Info']} data={mockOrdersShipped} addActionLabel="Create Order" />} />
          <Route path="orders/delivered" element={<CrudPage title="Delivered Orders" description="Orders successfully delivered to customers." columns={['Order ID', 'Customer', 'Date', 'Amount', 'Delivered On']} data={mockOrdersDelivered} addActionLabel="Create Order" />} />
          <Route path="orders/cancelled" element={<CrudPage title="Cancelled Orders" description="Orders that were cancelled." columns={['Order ID', 'Customer', 'Date', 'Amount', 'Reason']} data={mockOrdersCancelled} addActionLabel="Create Order" />} />
          <Route path="orders/returns" element={<CrudPage title="Returns & Refunds" description="Manage returned orders and refund status." columns={['Order ID', 'Customer', 'Amount', 'Return Reason', 'Refund Status']} data={mockOrdersReturns} addActionLabel="Process Refund" />} />

          {/* Customers */}
          <Route path="customers/online" element={<CrudPage title="Online Customers" description="Live customer profiles from storefront orders." columns={['Name', 'Place', 'Phone', 'Email', 'Total Orders', 'Spent']} data={mockCustomersAll} apiEndpoint="customers" addActionLabel="Add Customer" />} />
          <Route path="customers/direct" element={<CrudPage title="Direct Customers" description="Manage direct customer profiles." columns={['Name', 'Place', 'Email', 'Phone', 'Address', 'Date of Birth', 'Age', 'Gender']} data={mockCustomersAll} addActionLabel="Add Customer" />} />
          <Route path="customers/groups" element={<CrudPage title="Customer Groups" description="Manage segments of your customer base." columns={['Group Name', 'Members', 'Discount', 'Status']} data={mockCustomerGroups} addActionLabel="Create Group" />} />
          <Route path="customers/addresses" element={<CrudPage title="Customer Addresses" description="View all stored customer addresses." columns={['Customer', 'Address Line 1', 'City', 'State', 'Zip']} data={mockCustomerAddresses} addActionLabel="Add Address" />} />

          {/* Cart & Wishlist */}
          <Route path="cart/abandoned" element={<CrudPage title="Abandoned Carts" description="Track and recover abandoned checkouts." columns={['Customer', 'Items', 'Cart Value', 'Date', 'Status']} data={mockAbandonedCarts} addActionLabel="Send Reminder" />} />
          <Route path="cart/wishlists" element={<CrudPage title="Wishlists" description="View products added to customer wishlists." columns={['Customer', 'Product', 'Price', 'Added Date']} data={mockWishlists} addActionLabel="Export Wishlists" />} />

          {/* Coupons & Offers */}
          <Route path="offers/coupons" element={<CrudPage title="Coupons" description="Manage discount coupon codes live in the Store." columns={['Code', 'Discount', 'Usage Limit', 'Used', 'Valid Until', 'Status']} data={mockCoupons} apiEndpoint="coupons" addActionLabel="Create Coupon" />} />
          <Route path="offers/discount" element={<CrudPage title="Discount Offers" description="Manage promotional discount offers." columns={['Offer Name', 'Type', 'Value', 'Active Duration']} data={mockDiscountOffers} addActionLabel="Create Offer" />} />
          <Route path="offers/products" element={<CrudPage title="Product Offers" description="Special offers applied directly to products." columns={['Product', 'Offer Price', 'Discount %', 'Ends In']} data={mockProductOffers} addActionLabel="Add Product Offer" />} />

          {/* Payments */}
          <Route path="payments/transactions" element={<CrudPage title="Transactions" description="View all live payment gateway transactions synchronized in real-time." columns={['Transaction ID', 'Order ID', 'Customer', 'Method', 'Gateway', 'Amount', 'Status', 'Date']} data={mockTransactions} apiEndpoint="transactions" addActionLabel={null} />} />
          <Route path="payments/refunds" element={<CrudPage title="Refunds" description="Log of all refunded amounts." columns={['Refund ID', 'Order ID', 'Customer', 'Amount', 'Status']} data={mockRefunds} addActionLabel="Process Refund" />} />
          <Route path="payments/methods" element={<CrudPage title="Payment Methods" description="Configure active payment gateways (Razorpay, UPI, NetBanking, COD)." columns={['Method', 'Provider', 'Transaction Fee', 'Status']} data={mockPaymentMethods} apiEndpoint="payment-methods" addActionLabel="Add Provider" />} />
          <Route path="payments/failed" element={<CrudPage title="Failed Payments" description="Log of failed payment attempts." columns={['Transaction ID', 'Customer', 'Amount', 'Reason', 'Date']} data={mockFailedPayments} addActionLabel="Export CSV" />} />

          {/* Users & Roles */}
          <Route path="users/admins" element={<CrudPage title="Admin Users" description="Manage administrators and staff members." columns={['Name', 'Email', 'Role', 'Last Login', 'Status']} data={mockAdminUsers} addActionLabel="Add Admin" />} />
          <Route path="users/roles" element={<CrudPage title="Roles" description="Define user roles for the system." columns={['Role Name', 'Users Assigned', 'Created On']} data={mockRoles} addActionLabel="Add Role" />} />
          <Route path="users/permissions" element={<CrudPage title="Permissions" description="Manage access permissions for different roles." columns={['Module', 'View', 'Add', 'Edit', 'Delete']} data={mockPermissions} addActionLabel="Save Permissions" />} />

          {/* Reports */}
          <Route path="reports/sales" element={<CrudPage title="Sales Report" description="Comprehensive sales data and analytics." columns={['Date', 'Orders', 'Gross Sales', 'Discounts', 'Net Sales']} data={mockSalesReport} addActionLabel="Download Report" />} />
          <Route path="reports/products" element={<CrudPage title="Product Report" description="Product performance and sales metrics." columns={['Product', 'Sold Qty', 'Revenue', 'Views', 'Conversion']} data={mockProductReport} addActionLabel="Download Report" />} />
          <Route path="reports/customers" element={<CrudPage title="Customer Report" description="Customer acquisition and retention metrics." columns={['Date', 'New Customers', 'Returning', 'Avg Spend']} data={mockCustomerReport} addActionLabel="Download Report" />} />
          <Route path="reports/inventory" element={<CrudPage title="Inventory Report" description="Stock levels and valuation." columns={['Category', 'Total Items', 'Total Value', 'Out of Stock']} data={mockInventoryReport} addActionLabel="Download Report" />} />
          <Route path="reports/payments" element={<CrudPage title="Payment Report" description="Payment method statistics and fees." columns={['Method', 'Transactions', 'Total Volume', 'Fees', 'Net Amount']} data={mockPaymentReport} addActionLabel="Download Report" />} />

          {/* Settings */}
          <Route path="settings/general" element={<CrudPage title="General Settings" description="System-wide configuration settings." columns={['Setting', 'Value', 'Last Updated']} data={mockGeneralSettings} addActionLabel="Save Settings" />} />
          <Route path="settings/store" element={<CrudPage title="Store Settings" description="E-commerce specific configuration." columns={['Setting', 'Value', 'Last Updated']} data={mockStoreSettings} addActionLabel="Save Settings" />} />
          <Route path="settings/payments" element={<CrudPage title="Payment Settings" description="Configure payment gateways and currency." columns={['Setting', 'Value', 'Last Updated']} data={mockPaymentSettings} addActionLabel="Save Settings" />} />
          <Route path="settings/tax" element={<CrudPage title="Tax Settings" description="Configure tax rules and rates." columns={['Region', 'Tax Name', 'Rate (%)', 'Status']} data={mockTaxSettings} addActionLabel="Add Tax Rule" />} />
          <Route path="settings/email" element={<CrudPage title="Email Settings" description="SMTP and email template configurations." columns={['Template Name', 'Subject', 'Status']} data={mockEmailSettings} addActionLabel="Add Template" />} />
          <Route path="settings/sms" element={<CrudPage title="SMS Settings" description="SMS gateway and template configurations." columns={['Template Name', 'Message', 'Status']} data={mockSmsSettings} addActionLabel="Add Template" />} />

          {/* System */}
          <Route path="system/activity" element={<CrudPage title="Activity Logs" description="Audit log of user actions." columns={['Date/Time', 'User', 'Action', 'Module', 'IP Address']} data={mockActivityLogs} addActionLabel="Clear Logs" />} />
          <Route path="system/login" element={<CrudPage title="Login Logs" description="Audit log of user login sessions." columns={['Date/Time', 'User', 'IP Address', 'Browser', 'Status']} data={mockLoginLogs} addActionLabel="Clear Logs" />} />
          <Route path="system/notifications" element={<CrudPage title="Notifications" description="System alerts and notifications." columns={['Date/Time', 'Type', 'Message', 'Status']} data={mockNotifications} addActionLabel="Mark All Read" />} />
          <Route path="system/backup" element={<CrudPage title="Backup" description="System database and file backups." columns={['Date', 'File Name', 'Size', 'Status', 'Actions']} data={mockBackup} addActionLabel="Create Backup" />} />

          {/* Fallback */}
          <Route path="*" element={<CrudPage title="Page Not Found" description="The module you are looking for does not exist." columns={[]} data={[]} addActionLabel="Go Home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
