import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Calendar, 
  Activity, 
  User, 
  LogOut, 
  Menu,
  X,
  Home,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Download // Add Download icon
} from 'lucide-react';
import clinicLogo from './assets/logo.png';

import api, { getStoredToken, setStoredToken, removeStoredToken } from './api';

// Login Component
function LoginForm({ onLogin, loading, error }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
            <img 
              src={clinicLogo}
              alt="Kuzhiveil Dental's Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Activity className="w-8 h-8 text-white hidden" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Kuzhiveil Dental's</h1>
          <p className="text-gray-600 mt-2">Admin Panel Login</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Change Password Modal
function ChangePasswordModal({ isOpen, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ current_password: '', new_password: '' });
      setShowPasswords({ current: false, new: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.current_password}
                onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.new_password}
                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                minLength="6"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // UI state
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Data state
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]); // NEW: For Appointment Tracking
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
    // Modals / Selection
  
  const [apptPatient, setApptPatient] = useState(null); // NEW: For Appointment Modal
  const [selectedAppt, setSelectedAppt] = useState(null); // NEW: For Editing Appointment
  const [apptData, setApptData] = useState({ date: '', time: '' });

  // Form state
  const [formData, setFormData] = useState({
    regno: '',
    name: '',
    address: '',
    phone: '',
    age: ''
  });

  // Auth check on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = getStoredToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const result = await api.checkAuth();

        if (result.success && result.authenticated) {
          setIsAuthenticated(true);
          setCurrentUser(result.admin);
        } else {
          // Try one more time with token refresh
          const refreshed = await api.refreshToken();
          if (refreshed) {
            const retryResult = await api.checkAuth();
            if (retryResult.success && retryResult.authenticated) {
              setIsAuthenticated(true);
              setCurrentUser(retryResult.admin);
            } else {
              setIsAuthenticated(false);
              setCurrentUser(null);
            }
          } else {
            setIsAuthenticated(false);
            setCurrentUser(null);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Load data when authenticated  
  useEffect(() => {
    if (isAuthenticated) {
      loadPatients();
      loadDashboardStats();
    }
  }, [isAuthenticated]);

  // Add this useEffect for periodic token refresh
  useEffect(() => {
    let refreshInterval;
    
    if (isAuthenticated) {
      // Refresh token every 6 hours (before 7-day expiration)
      refreshInterval = setInterval(async () => {
        const refreshed = await api.refreshToken();
        if (!refreshed) {
          console.log('Token refresh failed, logging out...');
          handleLogout();
        }
      }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated]);

  // ADD THE HANDLEEXPORTCSV FUNCTION HERE
  const handleExportCSV = async () => {
    try {
      setLoading(true);
      setError(null);

      const patientsData = await api.exportPatients();

      if (patientsData.length === 0) {
        setError('No patients to export');
        return;
      }

      // Create CSV content
      const headers = ['Registration No', 'Name', 'Address', 'Phone', 'Age', 'Date'];
      const csvContent = [
        headers.join(','),
        ...patientsData.map(patient => {
          const formatCSVField = (field) => {
            if (!field) return '""';
            const stringField = String(field);
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
              return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
          };



 
          return [
            formatCSVField(patient.regno),
            formatCSVField(patient.name),
            formatCSVField(patient.address || ''),
            formatCSVField(patient.phone || ''),
            formatCSVField(patient.age),
            formatCSVField(formatDate(patient.created_at || patient.date))
          ].join(',');
        })
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `kuzhiveil_patients_${currentDate}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSuccess(`Patient data exported successfully! (${patientsData.length} records)`);

    } catch (err) {
      console.error('Export error:', err);
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // NEW: APPOINTMENT HANDLER
  const handleBookAppt = async () => {
    try {
      setLoading(true);
      const res = await api.createAppointment({
        regno: apptPatient.regno,
        date: apptData.date,
        time: apptData.time
      });
      if (res.success) {
        showSuccess(`Appointment set for ${apptPatient.name}`);
        setApptPatient(null);
        setApptData({ date: '', time: '' });
        if (currentView === 'appointments') loadAppointments();
      } else {
        setError(res.error);
      }
    } catch (err) { handleApiError(err); }
    finally { setLoading(false); }
  };

  const loadAppointments = async (search = '') => {
    try {
      setLoading(true);
      const result = await api.getAppointments(search);
      if (result.success) {
        setAppointments(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      setLoading(true);
      const result = await api.deleteAppointment(id);
      if (result.success) {
        showSuccess('Appointment cancelled successfully');
        loadAppointments();
      } else {
        setError(result.error || 'Failed to cancel appointment');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppt = async () => {
    try {
      setLoading(true);
      const result = await api.updateAppointment(selectedAppt._id, apptData);
      if (result.success) {
        showSuccess('Appointment updated successfully');
        setSelectedAppt(null);
        setApptData({ date: '', time: '' });
        loadAppointments();
      } else {
        setError(result.error || 'Failed to update appointment');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPatients = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const result = await api.getPatients(page, 50, search);
      
      if (result && result.data) {
        setPatients(result.data);
        setCurrentPage(result.pagination?.page || 1);
        setTotalPages(result.pagination?.total_pages || 1);
        setTotalCount(result.pagination?.total_count || 0);
        setSearchQuery(search);
      } else {
        setPatients([]);
        setCurrentPage(1);
        setTotalPages(1);
        setTotalCount(0);
      }
      
    } catch (err) {
      console.error('Load patients error:', err);
      setPatients([]);
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response || {});
    } catch (err) {
      console.error('Load stats error:', err);
      handleApiError(err);
    }
  };

  // Search handler
  const handleGlobalSearch = async (query) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      setSearchMode(false);
      setSearchQuery('');
      loadPatients(1, '');
      return;
    }

    setSearchMode(true);
    setSearchQuery(trimmedQuery);

    try {
      const result = await api.getPatients(1, 100, trimmedQuery);
      setPatients(result.data || []);
      setCurrentPage(1);
      setTotalPages(result.pagination?.total_pages || 1);
      setTotalCount(result.pagination?.total_count || 0);
    } catch (error) {
      console.error('Search error:', error);
      setPatients([]);
      setError('Search failed. Please try again.');
    }
  };

  // Handle search input with debouncing
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleGlobalSearch(query);
    }, 500);
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      if (searchMode && searchQuery) {
        loadSearchPage(newPage);
      } else {
        loadPatients(newPage, '');
      }
    }
  };

  const loadSearchPage = async (page) => {
    try {
      const result = await api.getPatients(page, 50, searchQuery);
      setPatients(result.data || []);
      setCurrentPage(result.pagination?.page || page);
      setTotalPages(result.pagination?.total_pages || 1);
      setTotalCount(result.pagination?.total_count || 0);
    } catch (error) {
      console.error('Load search page error:', error);
      setError('Failed to load search results');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchMode(false);
    setSearchQuery('');
    loadPatients(1, '');
  };

  // Form handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatePatient = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.createPatient(formData);

      if (result.success) {
        showSuccess('Patient registered successfully!');
        setFormData({ regno: '', name: '', address: '', phone: '', age: '' });
        await loadPatients();
        await loadDashboardStats();
      } else {
        setError(result.error || 'Failed to create patient');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      regno: patient.regno,
      name: patient.name,
      address: patient.address || '',
      phone: patient.phone || '',
      age: patient.age
    });
    setCurrentView('edit');
  };

  const handleUpdatePatient = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.updatePatient(selectedPatient.regno, formData);

      if (result.success) {
        showSuccess('Patient updated successfully!');
        await loadPatients();
        setSelectedPatient(null);
        setCurrentView('current');
      } else {
        setError(result.error || 'Failed to update patient');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async () => {
    if (!patientToDelete) return;

    try {
      setLoading(true);
      setError(null);

      const result = await api.deletePatient(patientToDelete.regno);

      if (result.success) {
        showSuccess('Patient deleted successfully!');
        await loadPatients();
        await loadDashboardStats();
      } else {
        setError(result.error || 'Failed to delete patient');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.changePassword(passwordData);

      if (result.success) {
        showSuccess('Password changed successfully!');
        setShowChangePassword(false);
      } else {
        setError(result.error || 'Failed to change password');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setCurrentView('dashboard');
      setPatients([]);
      setStats({});
    } catch (err) {
      console.error('Logout error:', err);
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.login(credentials);

      if (result.success) {
        setIsAuthenticated(true);
        setCurrentUser(result.admin);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.message?.includes('Authentication expired')) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setError('Your session has expired. Please login again.');
    } else {
      setError(error.message || 'An error occurred');
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Get latest registration number
  const getLatestRegno = () => {
    if (stats.latest_patients && stats.latest_patients.length \u003e 0) {
      return stats.latest_patients[0].regno;
    }
    return 'No registrations yet';
  };

  const getLatestPatient = () => {
    if (stats.latest_patients && stats.latest_patients.length \u003e 0) {
      return stats.latest_patients[0];
    }
    return null;
  };



  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  // Show loading screen
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} loading={loading} error={error} />;
  }

  // Main app interface
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <div className="w-8 h-8 mr-3 flex items-center justify-center">
            <img 
              src={clinicLogo} 
              alt="Kuzhivelil Dental's Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Activity className="w-8 h-8 text-white hidden" />
          </div>
          <h1 className="text-white text-lg font-bold">Kuzhivelil Dental's</h1>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${currentView === 'dashboard'
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </button>

            <button
              onClick={() => {
                setCurrentView('new');
                setFormData({ regno: '', name: '', address: '', phone: '', age: '' });
                setError(null);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${currentView === 'new'
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Plus className="w-5 h-5 mr-3" />
              New Registration
            </button>


            <button
              onClick={() => {
                setCurrentView('current');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${currentView === 'current'
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Patient Records
            </button>

            <button
              onClick={() => {
                setCurrentView('appointments');
                loadAppointments();
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${currentView === 'appointments'
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
            </button>

            {/* Add Export CSV button */}
            <button
              onClick={handleExportCSV}
              disabled={loading}
              className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5 mr-3" />
              {loading ? 'Exporting...' : 'Export as CSV'}
            </button>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{currentUser?.username}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Mobile layout - show clinic name only when sidebar is closed */}
            {!sidebarOpen && (
              <div className="lg:hidden flex flex-col">
                <h1 className="text-lg font-bold text-blue-600">Kuzhivelil Dental's</h1>
                <span className="text-gray-600 text-xs font-bold">
                  Welcome, {currentUser?.username}
                </span>
              </div>
            )}
            
            {/* Tablet/Desktop - only welcome message */}
            <div className="hidden lg:block">
              <span className="text-gray-600 text-sm font-bold">
                Welcome back, {currentUser?.username}
              </span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="px-4 pt-4">
          {successMessage && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex items-center mb-4">
              <span className="flex-1">{successMessage}</span>
              <button onClick={() => setSuccessMessage(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center mb-4">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4">
          
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Patients</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_patients || 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setSearchTerm(today);
                    handleGlobalSearch(today);
                    setCurrentView('current');
                  }}
                  className="bg-white shadow-sm p-6 border border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Registrations</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.today_registrations || 0}</p>
                      <p className="text-xs text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to view →</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setCurrentView('appointments');
                    loadAppointments();
                  }}
                  className="bg-white shadow-sm p-6 border border-gray-100 cursor-pointer hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.today_appointments || 0}</p>
                      <p className="text-xs text-purple-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to view →</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Latest Registration</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">{getLatestRegno()}</p>
                      {getLatestPatient() && (
                        <p className="text-xs text-gray-500 mt-1">
                          {getLatestPatient().name} - {formatDate(getLatestPatient().date || getLatestPatient().created_at)}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-orange-100 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">Recent Patients</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50 sticky top-0 z-10 border-b border-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Reg No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {(stats.latest_patients && stats.latest_patients.length > 0) ? (
                        stats.latest_patients.map((patient) => (
                          <tr key={patient.regno} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.regno}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.phone || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                              {formatDate(patient.created_at || patient.date)}
                            </td>
                          </tr>
                        ))
                      ) : patients.length > 0 ? (
                        patients.slice(0, 5).map((patient) => (
                          <tr key={patient.regno} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.regno}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">{patient.phone || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">{patient.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                              {formatDate(patient.created_at || patient.date)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No patients registered yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* New Registration Form */}
          {currentView === 'new' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">New Patient Registration</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
                      <input
                        type="text"
                        name="regno"
                        value={formData.regno}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="e.g., REG001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Patient name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Age"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="10 digit phone number (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="Full address (optional)"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePatient}
                      disabled={!formData.name || !formData.age || !formData.regno || loading}
                      className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Register Patient
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patient Records View */}
          {currentView === 'current' && (
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Patient Records</h2>
                  {searchMode && (
                    <p className=\"text-sm text-blue-600 mt-1\"\u003e
                      Search results for \"{searchQuery}\" ({totalCount} found)
                    \u003c/p\u003e
                  )}
                \u003c/div\u003e
                
                \u003cdiv className=\"flex items-center gap-3\"\u003e
                  \u003cbutton
                    onClick={() =\u003e {
                      const today = new Date().toISOString().split('T')[0];
                      setSearchTerm(today);
                      handleGlobalSearch(today);
                    }}
                    className=\"hidden sm:flex items-center px-4 py-3 bg-white border border-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm font-medium\"
                  \u003e
                    \u003cCalendar className=\"w-4 h-4 mr-2\" /\u003e
                    Today's List
                  \u003c/button\u003e

                  \u003cdiv className=\"relative group\"\u003e
                    \u003cSearch className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-blue-600\" /\u003e
                    \u003cinput
                      type=\"text\"
                      value={searchTerm}
                      onChange={handleSearchInput}
                      placeholder=\"Search patients...\"
                      className=\"pl-10 pr-12 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-96 bg-blue-50/30 hover:bg-blue-50/50 transition-all shadow-sm\"
                    /\u003e
                    {searchTerm && (
                      \u003cbutton
                        onClick={clearSearch}
                        className=\"absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600\"
                      \u003e
                        \u003cX className=\"w-5 h-5\" /\u003e
                      \u003c/button\u003e
                    )}
                  \u003c/div\u003e
                \u003c/div\u003e

              {/* Table container with sharp corners */}
              <div className="flex-1 bg-white shadow-sm border border-gray-100 flex flex-col max-h-[calc(100vh-200px)]">
                <div className="flex-1 overflow-auto min-h-[500px]">
                  <table className="w-full">
                    <thead className="bg-blue-50 sticky top-0 z-10 border-b border-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Reg No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {patients.length > 0 ? (
                        patients.map((patient) => (
                          <tr key={patient.regno} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.regno}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.address || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.phone || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{patient.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{formatDate(patient.date || patient.created_at)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(patient)}
                                  className="inline-flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setApptPatient(patient)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Calendar className="w-4 h-4" /></button>
                                <button
                                  onClick={() => {
                                    setPatientToDelete(patient);
                                    setShowDeleteModal(true);
                                  }}
                                  className="inline-flex items-center px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center">
                              <Users className="w-12 h-12 text-gray-300 mb-4" />
                              <p className="text-lg font-medium text-gray-900">
                                {searchMode ? 'No search results found' : 'No patients found'}
                              </p>
                              <p className="text-gray-500">
                                {searchMode 
                                  ? `No patients match "${searchQuery}"`
                                  : 'No patients registered yet'
                                }
                              </p>
                              {searchMode && (
                                <button
                                  onClick={clearSearch}
                                  className="mt-3 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                  Clear Search
                                </button>
                              )}
                            </div>
                          </td>
                         
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination with sharp corners */}
                {totalPages > 1 && (
                  <div className="border-t bg-white px-6 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-gray-500">
                        Showing {((currentPage - 1) * 50) + 1} to {Math.min(currentPage * 50, totalCount)} of {totalCount} patients
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 bg-white border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          First
                        </button>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-white border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        
                        <div className="flex items-center space-x-1">
                          {(() => {
                            const pages = [];
                            const start = Math.max(1, currentPage - 2);
                            const end = Math.min(totalPages, currentPage + 2);
                            
                            for (let i = start; i <= end; i++) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => handlePageChange(i)}
                                  className={`px-3 py-2 text-sm transition-colors ${
                                    i === currentPage
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }
                            return pages;
                          })()}
                        </div>
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-white border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 bg-white border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Last
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointments View */}
          {currentView === 'appointments' && (
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
                  <p className="text-sm text-gray-500 mt-1">View scheduled visits grouped by date</p>
                </div>
                
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                  <input
                    type="text"
                    onChange={(e) => loadAppointments(e.target.value)}
                    placeholder="Search appointments..."
                    className="pl-10 pr-4 py-3 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80 bg-blue-50/30 hover:bg-blue-50/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pb-8">
                {(() => {
                  // Group appointments by date
                  const groups = appointments.reduce((acc, appt) => {
                    const date = appt.date;
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(appt);
                    return acc;
                  }, {});

                  const sortedDates = Object.keys(groups).sort();

                  if (sortedDates.length === 0) {
                    return (
                      <div className="bg-white p-12 text-center border border-dashed border-gray-300">
                         <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                         <p className="text-lg font-medium text-gray-900">No appointments found</p>
                         <p className="text-sm text-gray-500">New appointments will show up here grouped by date</p>
                      </div>
                    );
                  }

                  return sortedDates.map(date => (
                    <div key={date} className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex justify-between items-center">
                        <h3 className="font-bold text-blue-800 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(date)}
                        </h3>
                        <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 font-bold">
                          {groups[date].length} {groups[date].length === 1 ? 'Appt' : 'Appts'}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {groups[date].map(appt => (
                          <div key={appt._id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 text-blue-700 px-3 py-1 font-bold text-sm">
                                {(() => {
                                  try {
                                    const [hours, minutes] = appt.time.split(':');
                                    const date = new Date();
                                    date.setHours(parseInt(hours));
                                    date.setMinutes(parseInt(minutes));
                                    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                                  } catch (e) {
                                    return appt.time;
                                  }
                                })()}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{appt.patient_name}</p>
                                <p className="text-xs text-gray-500">Reg: {appt.regno} | {appt.patient_phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedAppt(appt);
                                  setApptData({ date: appt.date, time: appt.time });
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit Time"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteAppointment(appt._id)}
                                className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                                title="Cancel Appointment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Edit Patient Form */}
          {currentView === 'edit' && selectedPatient && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Patient - {selectedPatient.regno}</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                      <input
                        type="text"
                        value={formData.regno}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Registration number cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => {
                        setSelectedPatient(null);
                        setCurrentView('current');
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdatePatient}
                      disabled={loading}
                      className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* NEW: Appointment Modal */}
      {apptPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-up">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-gray-500 text-sm mb-6">Scheduling for: <span className="font-bold text-blue-700">{apptPatient.name}</span></p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Select Date</label>
                <input type="date" className="w-full mt-1 p-3 border rounded-xl" value={apptData.date} onChange={e => setApptData({...apptData, date: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Select Time</label>
                <input type="time" className="w-full mt-1 p-3 border rounded-xl" value={apptData.time} onChange={e => setApptData({...apptData, time: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setApptPatient(null)} className="flex-1 py-3 font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
              <button 
                onClick={handleBookAppt} 
                disabled={!apptData.date || !apptData.time || loading}
                className="flex-1 py-3 font-semibold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Booking...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Edit Appointment Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-up">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reschedule Appointment</h3>
            <p className="text-gray-500 text-sm mb-6">Patient: <span className="font-bold text-blue-700">{selectedAppt.patient_name}</span></p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">New Date</label>
                <input type="date" className="w-full mt-1 p-3 border rounded-xl" value={apptData.date} onChange={e => setApptData({...apptData, date: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">New Time</label>
                <input type="time" className="w-full mt-1 p-3 border rounded-xl" value={apptData.time} onChange={e => setApptData({...apptData, time: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => { setSelectedAppt(null); setApptData({ date: '', time: '' }); }} className="flex-1 py-3 font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
              <button 
                onClick={handleUpdateAppt} 
                disabled={!apptData.date || !apptData.time || loading}
                className="flex-1 py-3 font-semibold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Saving...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && patientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Patient</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{patientToDelete.name}</strong> ({patientToDelete.regno})?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPatientToDelete(null);
                }}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeletePatient}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSubmit={handleChangePassword}
        loading={loading}
      />
    </div>
  );
}

export default App;
