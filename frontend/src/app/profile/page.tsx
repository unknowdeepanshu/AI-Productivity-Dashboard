'use client';

import { useState, useEffect } from 'react';
 
interface User {
  name: string;
  email: string;
  emailVerified: boolean;
}

export default function ProfilePage() {
  // State for user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for editing
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Temporary State for editing
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  // State for save loading
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data from backend when component loads
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      
      setUser({
        name: data.name || 'User',
        email: data.email || '',
        emailVerified: data.emailVerified || false,
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load profile. Please try again.');
      
      // Fallback to demo data for development
      setUser({
        name: 'Demo User',
        email: 'demo@example.com',
        emailVerified: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handler to update name
  const handleNameUpdate = async () => {
    if (isEditingName) {
      // Save the name
      try {
        setIsSaving(true);
        
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ name: tempName }),
        });

        if (!response.ok) {
          throw new Error('Failed to update name');
        }

        // Update local state
        setUser((prev) => prev ? { ...prev, name: tempName } : null);
        setIsEditingName(false);
        
        // Optional: Show success message
        console.log('Name updated successfully!');
        
      } catch (err) {
        console.error('Error updating name:', err);
        alert('Failed to update name. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      // Start editing
      setTempName(user?.name || '');
      setIsEditingName(true);
    }
  };

  // Handler to update email
  const handleEmailUpdate = async () => {
    if (isEditingEmail) { 
      try {
        setIsSaving(true);
         
        const response = await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ email: tempEmail }),
        });

        if (!response.ok) {
          throw new Error('Failed to update email');
        }
 
        setUser((prev) => prev ? { ...prev, email: tempEmail, emailVerified: false } : null);
        setIsEditingEmail(false);
        
        console.log('Email updated successfully!');
        
      } catch (err) {
        console.error('Error updating email:', err);
        alert('Failed to update email. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      // Start editing
      setTempEmail(user?.email || '');
      setIsEditingEmail(true);
    }
  };

  // Handler to logout
  const handleLogout = async () => {
    try {
      
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

       
      window.location.href = '/login';
      
    } catch (err) {
      console.error('Error logging out:', err); 
      window.location.href = '/login';
    }
  };
 
  const handleDeleteAccount = async () => {
    try { 
      const response = await fetch('/api/user/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
 
      window.location.href = '/';
      
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account. Please try again.');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Failed to Load Profile</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {user?.name || 'User'}
              </h1>
              <p className="text-slate-500 mt-1 text-sm">Profile Settings</p>
            </div>
           <button
            onClick={handleLogout}
            className="
              px-5 py-2.5
              rounded-[0.4rem]
              font-medium
              transition-all duration-200
              backdrop-blur-md
              bg-[rgba(224,232,255,0.1)]
              border-[1.5px] border-[rgba(116,114,114,0.3)]
              text-[#4c4c4c]
              shadow-sm
              hover:bg-[rgba(224,232,255,0.2)]
              hover:border-[rgba(116,114,114,0.5)]
              hover:shadow-md
            "
          >
            Logout
          </button>


          </div>
        </div>
 
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
          
          {/* Name update section */}
          <div className="p-8 pb-4">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Name
                </span>
                <div className="mt-2 flex gap-3">
                  <input
                    type="text"
                    value={isEditingName ? tempName : user?.name || ''}
                    onChange={(e) => setTempName(e.target.value)}
                    disabled={!isEditingName || isSaving}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      isEditingName
                        ? 'border-blue-400 bg-white focus:border-blue-500 focus:ring-0 focus:outline-none text-slate-900'
                        : 'border-slate-300 bg-slate-100 text-slate-600 disabled:hover:bg-slate-200'
                    } font-medium disabled:opacity-80`}
                  />



                  <button
                    onClick={handleNameUpdate}
                    disabled={isSaving}
                    className={`
                      px-5 py-2.5
                      rounded-[0.4rem]
                      font-medium
                      transition-all duration-200
                      backdrop-blur-md
                      bg-[rgba(224,232,255,0.1)]
                      border-[1.5px] border-[rgba(116,114,114,0.3)]
                      text-[#4c4c4c]
                      shadow-sm
                      hover:bg-[rgba(224,232,255,0.2)]
                      hover:border-[rgba(116,114,114,0.5)]
                      hover:shadow-md
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      disabled:shadow-none
                    `}
                  >
                    {isSaving ? 'Saving...' : isEditingName ? 'Save' : 'Update'}
                  </button>

                </div>
              </label>

              {isEditingName && !isSaving && (
                <button
                  onClick={() => {
                    setIsEditingName(false);
                    setTempName(user?.name || '');
                  }}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
 
          <div className="p-8 pt-4">
            <div className="space-y-4">
              <label className="block">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Email
                  </span>
                  {/* {user?.emailVerified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Verified
                    </span>
                  )} */}
                </div>
                <div className="mt-2 flex gap-3">
                <input
                  type="email"
                  value={isEditingEmail ? tempEmail : user?.email || ''}
                  onChange={(e) => setTempEmail(e.target.value)}
                  disabled={!isEditingEmail || isSaving}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isEditingEmail
                      ? 'border-blue-400 bg-white focus:border-blue-500 focus:ring-0 focus:outline-none text-slate-900'
                      : 'border-slate-300 bg-slate-100 text-slate-600 disabled:hover:bg-slate-200'
                  } font-medium disabled:opacity-80`}
                />

                 <button
                  onClick={handleEmailUpdate}
                  disabled={isSaving}
                  className={`
                    px-5 py-2.5
                    rounded-[0.4rem]
                    font-medium
                    transition-all duration-200
                    backdrop-blur-md
                    bg-[rgba(224,232,255,0.1)]
                    border-[1.5px] border-[rgba(116,114,114,0.3)]
                    text-[#4c4c4c]
                    shadow-sm
                    hover:bg-[rgba(224,232,255,0.2)]
                    hover:border-[rgba(116,114,114,0.5)]
                    hover:shadow-md
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:shadow-none
                  `}
                >
                  {isSaving ? 'Saving...' : isEditingEmail ? 'Save' : 'Update'}
                </button>

                </div>
              </label>

              {isEditingEmail && !isSaving && (
                <button
                  onClick={() => {
                    setIsEditingEmail(false);
                    setTempEmail(user?.email || '');
                  }}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
              {/* delete sectiopn */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200/50 p-8 mt-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 -2">Delete Account</h3>
              <p className="text-slate-600 text-sm mb-4">
                Your account will be permanently deleted and you will lose access to it and any of your team and organization data. This action is irreversible.
              </p>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-5 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all duration-200 border border-red-200"
                >
                  Delete Account
                </button>
              ) : (
                <div className="flex gap-3 items-center">
                  <p className="text-sm font-medium text-slate-700">Are you absolutely sure?</p>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-rose-800 transition-all duration-200 shadow-md"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Built for WeMakeDev Hackathon • Powered by Tampo AI</p>
        </div>
      </div>
    </div>
  );
}