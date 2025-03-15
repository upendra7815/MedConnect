import React from 'react';
import { Calendar, Clock, VideoIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useAppointments } from '../hooks/useAppointments';

export function Dashboard() {
  const { appointments, isLoading } = useAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="col-span-full bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Here's your health dashboard</p>
      </div>

      {/* Upcoming Appointments */}
      <div className="col-span-full lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                {appointment.type === 'VIDEO' ? (
                  <VideoIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <Calendar className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Dr. {appointment.doctorName}</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 mr-3">
                    {format(new Date(appointment.dateTime), 'MMM dd, yyyy')}
                  </span>
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    {format(new Date(appointment.dateTime), 'hh:mm a')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-span-full lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Book New Appointment
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            View Medical Records
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Start Video Consultation
          </button>
        </div>
      </div>
    </div>
  );
}