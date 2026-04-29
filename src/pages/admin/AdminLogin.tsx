import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, UserPlus, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session so the user is forced to login every time they visit the login page
    localStorage.removeItem('admin_authenticated');
  }, []);

  const getRegisteredUsers = () => {
    const users = localStorage.getItem('admin_users');
    return users ? JSON.parse(users) : [{ username: 'admin', password: 'admin123' }];
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const users = getRegisteredUsers();
      const user = users.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        localStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid username or password. Access Denied!');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    if (oldPassword !== 'admin123') {
      setError('You are not the ADMIN!');
      setIsRegistering(false);
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const users = getRegisteredUsers();
      if (users.find((u: any) => u.username === username)) {
        setError('Username already exists');
        setIsLoading(false);
        return;
      }
      
      users.push({ username, password });
      localStorage.setItem('admin_users', JSON.stringify(users));
      
      setSuccessMsg('Registration successful! Please sign in.');
      setIsRegistering(false);
      setPassword('');
      setConfirmPassword('');
      setOldPassword('');
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = isRegistering ? handleRegister : handleLogin;

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4 bg-cover bg-center bg-fixed transition-all duration-500"
      style={{ backgroundImage: `url(${isRegistering ? 'https://i.ibb.co/cSsHtvS9/p1.png' : 'https://i.ibb.co/mrtDMPDF/p2.png'})` }}
    >
      <div className="absolute inset-0 bg-[var(--color-army-dark)]/80 backdrop-blur-sm z-0"></div>

      <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white font-semibold flex items-center gap-2 hover:text-[var(--color-accent-pink)] transition-colors z-20">
        <ArrowLeft size={20} /> Back to Website
      </button>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-pink)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-army-dark)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-white/20 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-army-dark)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer" onClick={() => navigate('/')}>
             <img src="https://i.ibb.co/mrtDMPDF/p2.png" alt="HopeXavier Logo" className="h-10 object-contain drop-shadow-md" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-army-dark)]">Admin Portal</h2>
          <p className="text-gray-500 mt-2">
            {isRegistering ? 'Create a new admin account' : 'Sign in to manage the academy'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 text-center border border-red-100 flex items-center justify-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-medium mb-6 text-center border border-green-100 flex items-center justify-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-army-dark)] focus:border-[var(--color-army-dark)] outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <KeyRound size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-army-dark)] focus:border-[var(--color-army-dark)] outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={18} />
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-army-dark)] focus:border-[var(--color-army-dark)] outline-none transition-all placeholder-gray-400 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          {isRegistering && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Old Password (Master)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={18} />
                </div>
                <input 
                  type="password" 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-army-dark)] focus:border-[var(--color-army-dark)] outline-none transition-all placeholder-gray-400 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[var(--color-army-dark)] hover:bg-[var(--color-army-light)] text-[var(--color-accent-pink)] py-3.5 px-4 rounded-xl font-bold uppercase tracking-wide transition-all shadow-md transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-[var(--color-accent-pink)] border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <div className="flex items-center space-x-2">
                 {isRegistering ? <UserPlus size={18} /> : <Lock size={18} />}
                 <span>{isRegistering ? 'Register' : 'Sign In'}</span>
               </div>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm">
          {!isRegistering ? (
            <p className="text-gray-500">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => { setIsRegistering(true); setError(''); setSuccessMsg(''); }} 
                className="text-[var(--color-army-dark)] font-bold hover:underline"
              >
                Register here
              </button>
            </p>
          ) : (
            <p className="text-gray-500">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => { setIsRegistering(false); setError(''); setSuccessMsg(''); }} 
                className="text-[var(--color-army-dark)] font-bold hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
