import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, AlertCircle } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('admin@rswellness.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@rswellness.com' && password === 'password123') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="login-overlay">
          <div className="login-branding-large">
            <Leaf size={48} className="text-secondary mb-4" />
            <h1 className="text-h1 text-white mb-4" style={{ fontSize: '2.5rem' }}>RS Wellness.</h1>
            <p className="text-body" style={{ color: '#DCFCE7', fontSize: '1.125rem', maxWidth: '400px' }}>
              The premium management dashboard for your natural wellness & herbal products e-commerce store.
            </p>
          </div>
        </div>
      </div>
      
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="logo-mobile-only hidden">
              <Leaf size={32} className="text-primary mb-2" />
            </div>
            <h2 className="text-h2 mb-2">Welcome Back</h2>
            <p className="text-small mb-6">Please sign in to access your dashboard.</p>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group relative">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="admin@rswellness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group relative">
              <div className="flex justify-between items-center mb-1">
                <label className="form-label mb-0">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group flex items-center gap-2 mb-6">
              <input type="checkbox" id="remember" className="custom-checkbox" defaultChecked />
              <label htmlFor="remember" className="text-small cursor-pointer">Remember me for 30 days</label>
            </div>

            <button type="submit" className="btn btn-primary w-full login-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-credentials mt-8 p-4 bg-neutral-light rounded-md">
            <p className="text-small font-medium mb-2">Demo Credentials:</p>
            <p className="text-small mb-1">Email: <strong>admin@rswellness.com</strong></p>
            <p className="text-small">Password: <strong>password123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
