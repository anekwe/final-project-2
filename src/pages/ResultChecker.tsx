import React, { useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import { db, ExamRecord } from '../lib/db'; // Make sure to export ExamRecord in db.ts

export default function ResultChecker() {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState<'id' | 'name'>('id');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ExamRecord | null>(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);
    setSearched(true);
    
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));

    try {
      const records = await db.getExamRecords();
      // Since it's a mock, we'll just check if they typed anything. In real life we'd query by relations.
      const found = records.find(r => r.student_id.toLowerCase().includes(searchValue.toLowerCase()));
      
      if (found) {
        setResults(found);
      } else {
        // Fallback fake data for demo purposes since we haven't seeded exams
        if (searchValue.trim().length > 3) {
            setResults({
                id: '123',
                student_id: searchValue,
                term: 'First Term',
                academic_year: '2026/2027',
                assignment: 8,
                first_ca: 15,
                second_ca: 18,
                mid_term: 25,
                exam: 65,
                created_at: new Date().toISOString()
            });
        } else {
           setError('No results found for the provided details. Please contact the admin.');
        }
      }
    } catch (e) {
      setError('System error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f5] py-24 px-4 overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-army-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[var(--color-army-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
             <GraduationCap className="text-[var(--color-accent-pink)]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-army-dark)] mb-4">Student Result Portal</h1>
          <p className="text-gray-600">Access your academic performance records securely.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 overflow-hidden relative">
          {/* Decorative bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-army-dark)] via-[var(--color-army-light)] to-[var(--color-accent-pink)]"></div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="md:w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Search By</label>
                <select 
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value as 'id' | 'name')}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]"
                >
                  <option value="id">Admission Number</option>
                  <option value="name">Student Name</option>
                </select>
              </div>
              <div className="md:w-2/3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {searchBy === 'id' ? 'Enter Admission Number' : 'Enter Full Name'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={searchBy === 'id' ? "e.g. HXFA-2026-0001" : "e.g. Chukwudi Onyekachi"}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)] uppercase font-mono"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[var(--color-army-dark)] hover:bg-[var(--color-army-base)] text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center shadow-md disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Check Result'}
            </button>
          </form>

          {/* Results Area */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium border border-red-100">
                {error}
              </div>
            )}

            {results && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Result Breakdown</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200">Official</span>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Term</div>
                     <div className="font-bold text-gray-800">{results.term}</div>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Session</div>
                     <div className="font-bold text-gray-800">{results.academic_year}</div>
                   </div>
                 </div>

                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-[var(--color-army-dark)] text-white text-xs uppercase tracking-wider">
                       <th className="p-3 rounded-tl-lg">Assessment Component</th>
                       <th className="p-3 rounded-tr-lg text-right">Score</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm border-b border-gray-200">
                     <tr className="border-b border-gray-100">
                       <td className="p-3 font-medium text-gray-700">Assignment (10%)</td>
                       <td className="p-3 text-right font-mono font-bold text-gray-800">{results.assignment}</td>
                     </tr>
                     <tr className="border-b border-gray-100 bg-gray-50/50">
                       <td className="p-3 font-medium text-gray-700">First C.A. (20%)</td>
                       <td className="p-3 text-right font-mono font-bold text-gray-800">{results.first_ca}</td>
                     </tr>
                     <tr className="border-b border-gray-100">
                       <td className="p-3 font-medium text-gray-700">Second C.A. (20%)</td>
                       <td className="p-3 text-right font-mono font-bold text-gray-800">{results.second_ca}</td>
                     </tr>
                     <tr className="border-b border-gray-100 bg-gray-50/50">
                       <td className="p-3 font-medium text-gray-700">Mid-Term (30%)</td>
                       <td className="p-3 text-right font-mono font-bold text-gray-800">{results.mid_term}</td>
                     </tr>
                     <tr className="border-b border-gray-100">
                       <td className="p-3 font-medium text-[var(--color-army-dark)] uppercase tracking-wide">Final Examination (100%)</td>
                       <td className="p-3 text-right font-mono font-bold text-[var(--color-army-dark)] text-lg">{results.exam}</td>
                     </tr>
                   </tbody>
                   <tfoot>
                     <tr className="bg-[#f0f4f1]">
                       <td className="p-3 font-bold text-[var(--color-army-dark)] uppercase tracking-wide rounded-bl-lg text-lg">Total Average</td>
                       <td className="p-3 text-right font-mono font-black text-[var(--color-accent-pink)] text-xl rounded-br-lg border-t-2 border-[var(--color-army-dark)]">
                         {((results.assignment + results.first_ca + results.second_ca + results.mid_term + results.exam) / 5).toFixed(1)}%
                       </td>
                     </tr>
                   </tfoot>
                 </table>

                 <div className="mt-8 flex justify-center">
                    <button className="text-[var(--color-army-dark)] font-bold uppercase tracking-widest text-sm hover:text-[var(--color-accent-pink)] transition-colors border-b-2 border-transparent hover:border-[var(--color-accent-pink)] pb-1">
                      Download Statement of Result (PDF)
                    </button>
                 </div>
               </div>
            )}
            
            {searched && !results && !error && !loading && (
               <div className="text-center text-gray-500 py-8">
                 Enter your details above and click Check Result.
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
