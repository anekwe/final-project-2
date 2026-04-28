import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, FileText, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Admissions', path: '/admin/admissions', icon: <UserCheck size={20} /> },
    { name: 'Student Records', path: '/admin/students', icon: <Users size={20} /> },
    { name: 'Staff Records', path: '/admin/staff', icon: <ClipboardList size={20} /> },
    { name: 'News & Blog', path: '/admin/news', icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 bg-[var(--color-army-dark)] w-64 text-white z-50 transform transition-transform duration-300 ease-in-out lg:transform-none shadow-2xl flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[var(--color-army-base)]/50">
          <div className="flex items-center space-x-4">
             <img src="https://i.ibb.co/mrtDMPDF/p2.png" alt="HopeXavier Logo" className="h-14 md:h-16 object-contain shrink-0 drop-shadow-md" />
            <div className="font-bold uppercase tracking-wider text-base md:text-lg leading-tight">
              Admin Portal
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[var(--color-accent-pink)] hover:text-pink-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  isActive 
                    ? "bg-[var(--color-accent-pink)] text-white shadow-md" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] h-16 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-800"
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">Super Admin</p>
              <p className="text-xs text-gray-500">admin@hopexavier.edu</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-army-light)] text-white flex items-center justify-center font-bold">
              SA
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
