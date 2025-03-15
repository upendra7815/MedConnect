import React from 'react';
import { Calendar, Clock, VideoIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAppointments } from '../hooks/useAppointments';

export function Appointments() {
  const { appointments, isLoading, cancelAppointment } = useAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Book New Appointment
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
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
              <button
                onClick={() => cancelAppointment(appointment.id)}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}