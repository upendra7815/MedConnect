package com.medconnect.service;

import com.medconnect.dto.DoctorResponse;
import com.medconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final UserRepository userRepository;

    public ResponseEntity<?> getAllDoctors() {
        List<DoctorResponse> doctors = userRepository.findByRolesContaining("ROLE_DOCTOR")
            .stream()
            .map(DoctorResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(doctors);
    }

    public ResponseEntity<?> getDoctorAvailability(Long doctorId) {
        // Implementation for getting doctor's available time slots
        return ResponseEntity.ok().build();
    }
}