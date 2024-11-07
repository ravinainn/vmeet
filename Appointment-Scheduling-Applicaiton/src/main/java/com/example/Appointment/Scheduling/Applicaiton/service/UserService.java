package com.example.Appointment.Scheduling.Applicaiton.service;

import com.example.Appointment.Scheduling.Applicaiton.exception.UserAlreadyExistsException;
import com.example.Appointment.Scheduling.Applicaiton.model.User;
import com.example.Appointment.Scheduling.Applicaiton.repository.AppointmentRepository;
import com.example.Appointment.Scheduling.Applicaiton.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;


    public User registerUser(User user) {
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new UserAlreadyExistsException("A user with that username already exists");
        }
        return userRepository.save(user);
    }
    public User loginUser(User loginUser){
        User user = findByUsername(loginUser.getUsername());
        if(user != null && user.getPassword().equals(loginUser.getPassword())){
            return user;
        }
        return null;
    }
    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }
    public User findById(Long userId){
        return userRepository.findById(userId).orElse(null);
    }


    public String[] getUsernames() {
        return userRepository.findAll().stream().map(User::getUsername).toArray(String[]::new);
    }
    public Map<String,String> getUserStatus( LocalDateTime start, LocalDateTime end){
        List<User> users = userRepository.findAll();
        return users.stream().collect(Collectors.toMap(User::getUsername,user->appointmentRepository.findOverlappingAppointments(user,start,end).isEmpty()?"free":"busy"));
    }
}
