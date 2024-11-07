package com.example.Appointment.Scheduling.Applicaiton.controller;

import com.example.Appointment.Scheduling.Applicaiton.DTO.AppointmentDTO;
import com.example.Appointment.Scheduling.Applicaiton.model.Appointment;
import com.example.Appointment.Scheduling.Applicaiton.model.User;
import com.example.Appointment.Scheduling.Applicaiton.service.AppointmentService;
import com.example.Appointment.Scheduling.Applicaiton.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @PostMapping("/schedule")
    public ResponseEntity<Appointment> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO){
        Appointment scheduledAppointment = appointmentService.scheduleAppointment(appointmentDTO);
        return ResponseEntity.ok(scheduledAppointment);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Appointment>> getUserAppointments(@PathVariable Long userId){
        User user = userService.findById(userId);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        List<Appointment> appointments = appointmentService.getUserAppointment(user);
        return ResponseEntity.ok(appointments);
    }
//    @PostMapping("/check-availability")
//    public ResponseEntity<Set<User>> checkAvailability(@RequestBody Appointment appointment){
//        Set<User> busyUsers = appointmentService.getBusyUsers(appointment.getAttendees(),appointment.getStartTime(), appointment.getEndTime());
//        return ResponseEntity.ok(busyUsers);
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Appointment> getAppointment(@PathVariable Long id, @RequestBody Appointment appointment){
//        return appointmentService.getAppointmentById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment){
        if(!appointmentService.getAppointmentById(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        appointment.setId(id);
        return ResponseEntity.ok(appointmentService.updateAppointment(appointment));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id){
        if(!appointmentService.getAppointmentById(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }


}
