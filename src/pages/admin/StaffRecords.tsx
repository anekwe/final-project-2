import React, { useState, useEffect } from 'react';
import { db, Staff } from '../../lib/db';
import { Plus, X, Search } from 'lucide-react';

export default function StaffRecords() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    surname: '',
    first_name: '',
    last_name: '',
    gender: 'Male',
    email_address: '',
    home_address: '',
    qualification: '',
    state: ''
  });

  const fetchStaff = async () => {
    const data = await db.getStaff();
    setStaff(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.addStaff(formData);
    setShowForm(false);
    fetchStaff();
    alert("Staff Record Created Successfully");
    setFormData({
      surname: '', first_name: '', last_name: '', gender: 'Male',
      email_address: '', home_address: '', qualification: '', state: ''
    });
  };

  const filteredStaff = staff.filter(s => 
    s.surname.toLowerCase().includes(search.toLowerCase()) || 
    s.email_address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Staff Records</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-army-dark)] text-white rounded-lg hover:bg-[var(--color-army-base)] transition-colors font-semibold shadow-sm"
        >
          <Plus size={18} /> <span>Add Staff</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">New Staff Registration</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Surname</label>
                  <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email_address" value={formData.email_address} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">State of Origin</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g., B.Ed, NCE, BSc" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Home Address</label>
                <input type="text" name="home_address" value={formData.home_address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2" />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-[var(--color-army-dark)] text-white font-semibold hover:bg-[var(--color-army-base)] shadow-md">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-end bg-gray-50/50">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-army-light)]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Qualification</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No staff found matching your search.</td>
                </tr>
              ) : filteredStaff.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{s.surname}, {s.first_name} {s.last_name}</td>
                  <td className="px-6 py-4 text-gray-500">{s.email_address}</td>
                  <td className="px-6 py-4">{s.state}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{s.qualification}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
