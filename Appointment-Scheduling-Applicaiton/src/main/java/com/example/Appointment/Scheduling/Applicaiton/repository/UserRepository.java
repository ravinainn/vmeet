package com.example.Appointment.Scheduling.Applicaiton.repository;

import com.example.Appointment.Scheduling.Applicaiton.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

}
