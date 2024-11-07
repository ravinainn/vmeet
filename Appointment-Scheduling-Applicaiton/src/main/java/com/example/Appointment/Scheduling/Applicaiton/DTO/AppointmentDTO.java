package com.example.Appointment.Scheduling.Applicaiton.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class AppointmentDTO {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long organizerId;
    private Set<String> attendeeUsernames;
}
