package com.example.Appointment.Scheduling.Applicaiton.service;

import com.example.Appointment.Scheduling.Applicaiton.DTO.AppointmentDTO;
import com.example.Appointment.Scheduling.Applicaiton.model.Appointment;
import com.example.Appointment.Scheduling.Applicaiton.model.User;
import com.example.Appointment.Scheduling.Applicaiton.repository.AppointmentRepository;
import com.example.Appointment.Scheduling.Applicaiton.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment scheduleAppointment(AppointmentDTO appointmentDTO) {
        Appointment appointment  = new Appointment();
        appointment.setTitle(appointmentDTO.getTitle());
        appointment.setDescription(appointmentDTO.getDescription());
        appointment.setStartTime(appointmentDTO.getStartTime());
        appointment.setEndTime(appointmentDTO.getEndTime());
        User organizer = userRepository.findById(appointmentDTO.getOrganizerId()).orElseThrow(() -> new RuntimeException("Organizer Not Found"));
        appointment.setOrganizer(organizer);
        Set<User> attendees = appointmentDTO.getAttendeeUsernames().stream().map(username -> userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("user not found: "+ username))).collect(Collectors.toSet());
        appointment.setAttendees(attendees);
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);
        return appointmentRepository.save(appointment);
    }
    public List<Appointment> getUserAppointment(User user){
        return appointmentRepository.findAllByUserInvolved(user);
    }


    public Optional<Appointment> getAppointmentById(Long id){
        return appointmentRepository.findById(id);
    }

    public Appointment updateAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }
    public void deleteAppointment(Long id){
        appointmentRepository.deleteById(id);
    }


}
