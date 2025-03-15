package com.medconnect.service;

import com.medconnect.dto.AppointmentRequest;
import com.medconnect.dto.AppointmentResponse;
import com.medconnect.model.Appointment;
import com.medconnect.model.User;
import com.medconnect.repository.AppointmentRepository;
import com.medconnect.repository.UserRepository;
import com.medconnect.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public ResponseEntity<?> createAppointment(AppointmentRequest request) {
        User patient = getCurrentUser();
        User doctor = userRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setDateTime(request.getDateTime());
        appointment.setType(request.getType());
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);

        appointmentRepository.save(appointment);
        return ResponseEntity.ok(new AppointmentResponse(appointment));
    }

    public ResponseEntity<?> getMyAppointments() {
        User currentUser = getCurrentUser();
        List<Appointment> appointments;
        
        if (currentUser.getRoles().contains("ROLE_DOCTOR")) {
            appointments = appointmentRepository.findByDoctor(currentUser);
        } else {
            appointments = appointmentRepository.findByPatient(currentUser);
        }

        List<AppointmentResponse> response = appointments.stream()
            .map(AppointmentResponse::new)
            .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        User currentUser = getCurrentUser();
        if (!appointment.getPatient().getId().equals(currentUser.getId()) &&
            !appointment.getDoctor().getId().equals(currentUser.getId())) {
            return ResponseEntity.badRequest().body("Not authorized to cancel this appointment");
        }

        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        return ResponseEntity.ok(new AppointmentResponse(appointment));
    }

    private User getCurrentUser() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        return userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}