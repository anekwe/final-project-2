import { useState, useEffect } from 'react';
import { db, Application, Student, Staff } from '../../lib/db';
import { Users, UserCheck, FileText, Activity } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    students: 0,
    staff: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const apps = await db.getApplications();
      const students = await db.getStudents();
      const staff = await db.getStaff();
      
      setStats({
        pending: apps.filter(a => a.status === 'Pending').length,
        students: students.length,
        staff: staff.length
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last login: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mr-4">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Applications</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.pending}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.students}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mr-4">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Staff</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.staff}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-500 mr-4">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">System Status</p>
            <h3 className="text-2xl font-bold text-gray-800">100% Core</h3>
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/admissions" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-colors flex flex-col items-center justify-center text-center">
              <UserCheck className="mb-2 text-[var(--color-army-light)]" />
              <span className="font-medium text-sm">Review Admissions</span>
            </a>
            <a href="/admin/students" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-colors flex flex-col items-center justify-center text-center">
              <Users className="mb-2 text-[var(--color-army-light)]" />
              <span className="font-medium text-sm">Add New Student</span>
            </a>
            <a href="/admin/news" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-colors flex flex-col items-center justify-center text-center">
              <FileText className="mb-2 text-[var(--color-army-light)]" />
              <span className="font-medium text-sm">Post News Event</span>
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center min-h-[300px]">
           <div className="text-center text-gray-400">
             <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
             <p>No new system alerts.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
