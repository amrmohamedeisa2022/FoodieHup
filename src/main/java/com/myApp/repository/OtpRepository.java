package com.myApp.repository;

import com.myApp.model.Otp;
import com.myApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp,Long> {

  Optional<Otp> findTopByUserOrderByExpirationTimeDesc(User user);
    Optional<Otp> findTopByUserEmailOrderByExpirationTimeDesc(String email);
    Optional<Otp> findByUserAndOtp(User user, String otp);
    Optional<Otp> findByOtp(String otp);
    void deleteByUser(User user);


}
