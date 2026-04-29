import React, { useState } from 'react';
import { db } from '../lib/db';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApplyNow() {
  const [formData, setFormData] = useState({
    parent_full_name: '',
    student_full_name: '',
    student_type: 'New' as 'New' | 'Old',
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate network request
      await new Promise(res => setTimeout(res, 1500));
      
      await db.addApplication(formData);
      
      setSuccess(true);
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f9fa] px-4 py-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-[var(--color-army-base)]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-army-dark)] mb-4">Application Submitted Successfully</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for applying to HopeXavier First Academy. The school management has been notified. We will reach out to you via Email and WhatsApp shortly.
          </p>
          <Link to="/" className="inline-flex items-center text-[var(--color-army-base)] font-bold hover:text-[var(--color-accent-pink)] transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f5] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-army-dark)] mb-4">Admission Application</h1>
          <p className="text-gray-600">Please fill out the form carefully to register your child for the upcoming academic session.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
          
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Parent's Full Name *</label>
                <input 
                  type="text" 
                  name="parent_full_name"
                  value={formData.parent_full_name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[var(--color-army-base)] transition-all"
                  placeholder="E.g., Dr. Emeka Onyekachi" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Student's Full Name *</label>
                <input 
                  type="text" 
                  name="student_full_name"
                  value={formData.student_full_name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[var(--color-army-base)] transition-all"
                  placeholder="E.g., Chukwudi Onyekachi" 
                  required 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number (WhatsApp Active) *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[var(--color-army-base)] transition-all"
                  placeholder="080XXXXXXXX" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[var(--color-army-base)] transition-all"
                  placeholder="example@email.com" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type of Student *</label>
              <select 
                name="student_type"
                value={formData.student_type}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[var(--color-army-base)] transition-all"
                required
              >
                <option value="New">New Admission</option>
                <option value="Old">Returning Student / Transfer</option>
              </select>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center
                  ${loading ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : 'bg-[var(--color-army-dark)] hover:bg-[var(--color-army-base)] text-white'}`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Application...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              By submitting this form, you agree to HopeXavier First Academy's admission policies.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
