import React from 'react';
import { Calendar, Users, FileText, Video, Menu, Bell, User } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">MedConnect</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50">
            <Calendar className="h-5 w-5 mr-3" />
            Appointments
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50">
            <Users className="h-5 w-5 mr-3" />
            Doctors
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50">
            <FileText className="h-5 w-5 mr-3" />
            Prescriptions
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50">
            <Video className="h-5 w-5 mr-3" />
            Video Consult
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 h-full">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}