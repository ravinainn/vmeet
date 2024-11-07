package com.example.Appointment.Scheduling.Applicaiton.repository;

import com.example.Appointment.Scheduling.Applicaiton.model.Appointment;
import com.example.Appointment.Scheduling.Applicaiton.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    @Query("SELECT a FROM Appointment a WHERE a.organizer = :user OR :user MEMBER OF a.attendees")
    List<Appointment> findAllByUserInvolved(User user);


    @Query("SELECT a FROM Appointment a WHERE (a.organizer = :user OR :user MEMBER OF a.attendees) AND ((a.startTime BETWEEN :start AND :end) OR (a.endTime BETWEEN :start AND :end) OR (a.startTime <= :start AND a.endTime >= :end))")
    List<Appointment> findOverlappingAppointments(User user, LocalDateTime start, LocalDateTime end);
}
