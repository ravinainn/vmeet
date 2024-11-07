package com.example.Appointment.Scheduling.Applicaiton.model;


import com.example.Appointment.Scheduling.Applicaiton.service.AppointmentService;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name="appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="organizer_id", nullable=false)
    private User organizer;

    @ManyToMany
    @JoinTable(name="appointment_attendees", joinColumns = @JoinColumn(name="appointment_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
    private Set<User> attendees;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String title;
    private String description;


    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String location;

    public enum AppointmentStatus{
        SCHEDULED, CANCELED, COMPLETED
    }





}
