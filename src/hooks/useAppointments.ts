import { useState, useEffect } from 'react';
import { appointments } from '../services/api';
import { toast } from 'react-hot-toast';

export function useAppointments() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await appointments.getMyAppointments();
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (id: number) => {
    try {
      await appointments.cancel(id);
      toast.success('Appointment cancelled successfully');
      loadAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  return {
    appointments: data,
    isLoading,
    cancelAppointment,
    refresh: loadAppointments
  };
}