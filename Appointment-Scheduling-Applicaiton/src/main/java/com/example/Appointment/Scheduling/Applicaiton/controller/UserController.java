package com.example.Appointment.Scheduling.Applicaiton.controller;


import com.example.Appointment.Scheduling.Applicaiton.exception.UserAlreadyExistsException;
import com.example.Appointment.Scheduling.Applicaiton.model.User;
import com.example.Appointment.Scheduling.Applicaiton.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> RegisterUser(@RequestBody User user){
        try {
            User registeredUser =userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);

        }catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while registering the user");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> LoginUser(@RequestBody User loginUser){
        try{
           User user = userService.loginUser(loginUser);
           if(user != null){
               return ResponseEntity.ok().body(user);
           }
           return ResponseEntity.badRequest().body("Invalid username or password");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");

        }
    }
    @GetMapping("/getUsernames")
    public ResponseEntity<?> GetUsernames(@RequestParam LocalDateTime start,@RequestParam LocalDateTime end){
        try{
            Map<String,String> userStatus = userService.getUserStatus(start,end);
            return ResponseEntity.ok().body(userStatus);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }



}
