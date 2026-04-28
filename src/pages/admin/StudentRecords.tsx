import React, { useState, useEffect } from 'react';
import { db, Student } from '../../lib/db';
import { Plus, X, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function StudentRecords() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  
  // Validation constraints
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    surname: '',
    other_names: '',
    date_of_birth: '',
    gender: 'Male',
    class: 'JSS 1',
    admission_number: `HXFA-${currentYear}-0001`
  });

  const fetchStudents = async () => {
    const data = await db.getStudents();
    setStudents(data);
    
    // Generate next admission number
    if (data.length > 0) {
      const currentYearStudents = data.filter(s => s.admission_number.includes(currentYear.toString()));
      const nextNum = (currentYearStudents.length + 1).toString().padStart(4, '0');
      setFormData(prev => ({ ...prev, admission_number: `HXFA-${currentYear}-${nextNum}` }));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict Validation Rule: "Current year only, No past year allowed"
    if (!formData.admission_number.includes(currentYear.toString())) {
      alert("Validation Error: Admission number must use the CURRENT YEAR (" + currentYear + ")");
      return;
    }

    // No duplicate number
    if (students.find(s => s.admission_number === formData.admission_number)) {
      alert("Validation Error: This admission number already exists.");
      return;
    }

    await db.addStudent(formData);
    setShowForm(false);
    fetchStudents();
    alert("Student Profile Created Successfully");
  };

  const filteredStudents = students.filter(s => 
    s.admission_number.toLowerCase().includes(search.toLowerCase()) || 
    s.surname.toLowerCase().includes(search.toLowerCase()) ||
    s.other_names.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Records</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-army-dark)] text-white rounded-lg hover:bg-[var(--color-army-base)] transition-colors font-semibold shadow-sm"
        >
          <Plus size={18} /> <span>Add Student</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">New Student Registration</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Surname *</label>
                  <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Other Names *</label>
                  <input type="text" name="other_names" value={formData.other_names} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth *</label>
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Class Assigned</label>
                  <select name="class" value={formData.class} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]">
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SS 1">SS 1</option>
                    <option value="SS 2">SS 2</option>
                    <option value="SS 3">SS 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
                    <span>Admission Number (Auto-Validated)</span>
                  </label>
                  <input type="text" name="admission_number" value={formData.admission_number} readOnly className="w-full bg-green-50 border border-green-200 text-green-800 font-mono rounded-lg px-4 py-3 focus:outline-none" />
                  <p className="text-xs text-gray-400 mt-1">Format: HXFA-YYYY-NNNN</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-lg bg-[var(--color-army-dark)] text-white font-semibold hover:bg-[var(--color-army-base)] shadow-md">Register Student</button>
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
              placeholder="Search by Name or Admission Num..." 
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
                <th className="px-6 py-4">Admission No.</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No students found matching your search.</td>
                </tr>
              ) : filteredStudents.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono font-bold text-[var(--color-army-light)]">{s.admission_number}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{s.surname}, {s.other_names}</td>
                  <td className="px-6 py-4">{s.gender}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{s.class}</span></td>
                  <td className="px-6 py-4 text-gray-500">{format(new Date(s.created_at), 'MMM dd, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
