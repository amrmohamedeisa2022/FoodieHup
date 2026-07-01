package com.myApp.controller;

import com.myApp.model.User;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activateUser(
            @RequestParam String email,
            @RequestParam String otp) {

        userService.activateUser(email, otp);
        return ResponseEntity.ok("Account activated successfully");
    }


    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam String email) {

        userService.forgetPassword(email);
        return ResponseEntity.ok("OTP sent to email");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        System.out.println("EMAIL = " + email);
        System.out.println("OTP = " + otp);

        String token = userService.verifyOtp(email, otp);
        return ResponseEntity.ok(token);
    }



    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam String resetToken,
            @RequestParam String newPassword) {

        userService.changePassword(resetToken, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }


    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String email) {
        userService.resendActivationOtp(email);
        return ResponseEntity.ok("OTP resent successfully");
    }

    @PostMapping("/resend-reset-otp")
    public ResponseEntity<?> resendResetOtp(@RequestParam String email) {
        userService.resendResetOtp(email);
        return ResponseEntity.ok("OTP resent successfully");
    }


    @DeleteMapping("/deleteProfile")
    public ResponseEntity<?> deleteMyAccount(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        userService.deleteUser(user.getEmail());

        return ResponseEntity.ok("Account deleted");
    }







}



