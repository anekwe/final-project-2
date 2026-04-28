import { useState, useEffect } from 'react';
import { db, Application } from '../../lib/db';
import { Check, X, Printer, RotateCcw, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function AdmissionManagement() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const fetchApps = async () => {
    setLoading(true);
    const apps = await db.getApplications();
    setApplications(apps.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'Accepted' | 'Rejected', applicantName: string) => {
    if (window.confirm(`Are you sure you want to ${status.toLowerCase()} ${applicantName}?`)) {
      await db.updateApplicationStatus(id, status);
      
      if (status === 'Accepted') {
        setModalMessage(`Application for ${applicantName} has been ACCEPTED. Acceptance messages sent via Email and WhatsApp.`);
      } else {
        setModalMessage(`Application for ${applicantName} has been REJECTED.`);
      }
      setShowModal(true);
      fetchApps();
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    navigate('/admin');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all applications? This will clear all submitted applications and restore the demo data.')) {
      localStorage.removeItem('applications');
      window.location.reload();
    }
  };

  const pendingApps = applications.filter(a => a.status === 'Pending');
  const processedApps = applications.filter(a => a.status !== 'Pending');

  return (
    <div className="space-y-6 relative">
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success</h3>
              <p className="text-gray-600 mb-8">{modalMessage}</p>
              
              <button 
                onClick={handleOkClick}
                className="w-full bg-[var(--color-army-dark)] hover:bg-[var(--color-army-light)] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admission Management</h1>
        <div className="flex space-x-2 text-sm">
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors">
            <Printer size={16} /> <span>Print</span>
          </button>
          <button onClick={handleReset} className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 hover:text-[var(--color-accent-pink)] transition-colors">
            <RotateCcw size={16} /> <span>Reset/Refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
           New Applicants (Pending)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Parent Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No pending applications found.</td>
                </tr>
              ) : pendingApps.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">{format(new Date(app.created_at), 'MMM dd, yyyy')}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.student_full_name}</td>
                  <td className="px-6 py-4">{app.parent_full_name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-semibold">{app.student_type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>{app.phone}</div>
                    <div className="text-gray-400 text-xs">{app.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                       <button 
                         onClick={() => handleStatusUpdate(app.id, 'Accepted', app.student_full_name)}
                         className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 text-white rounded text-xs font-bold hover:bg-green-600"
                        >
                         <Check size={14} /> <span>Accept</span>
                       </button>
                       <button 
                         onClick={() => handleStatusUpdate(app.id, 'Rejected', app.student_full_name)}
                         className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600"
                        >
                         <X size={14} /> <span>Reject</span>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
           Processed Applications
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left opacity-75">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Parent Name</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {processedApps.map((app) => (
                <tr key={app.id} className="border-b border-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{app.student_full_name}</td>
                  <td className="px-6 py-4">{app.parent_full_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${app.status === 'Accepted' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
