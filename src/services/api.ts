import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Add JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  signup: (data: any) => 
    api.post('/auth/signup', data),
};

export const appointments = {
  create: (data: any) => 
    api.post('/appointments', data),
  getMyAppointments: () => 
    api.get('/appointments'),
  cancel: (id: number) => 
    api.put(`/appointments/${id}/cancel`),
};

export const doctors = {
  getAll: () => 
    api.get('/doctors'),
  getAvailability: (doctorId: number) => 
    api.get(`/doctors/${doctorId}/availability`),
};

export default api;