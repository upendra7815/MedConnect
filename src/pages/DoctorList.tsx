import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, Star } from 'lucide-react';
import { doctors } from '../services/api';
import { toast } from 'react-hot-toast';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  rating: number;
}

export function DoctorList() {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await doctors.getAll();
      setDoctorsList(response.data);
    } catch (error) {
      toast.error('Failed to load doctors');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Available Doctors</h1>
        <div className="flex space-x-2">
          <select className="rounded-lg border-gray-300 text-gray-700">
            <option value="">All Specializations</option>
            <option value="cardiology">Cardiology</option>
            <option value="dermatology">Dermatology</option>
            <option value="neurology">Neurology</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsList.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={doctor.imageUrl || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800'}
                alt={doctor.name}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
              </div>
              <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}