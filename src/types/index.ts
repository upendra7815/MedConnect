export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'in-person' | 'video';
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  availability: string[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory: string[];
}