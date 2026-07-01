package com.myApp.service;

import com.myApp.config.JwtProvider;
import com.myApp.exceptions.CustomException;
import com.myApp.model.Otp;
import com.myApp.model.User;
import com.myApp.repository.CartRepository;
import com.myApp.repository.OtpRepository;
import com.myApp.repository.UserRepository;
import io.jsonwebtoken.JwtParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
   @Autowired
private PasswordEncoder passwordEncoder;
    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailServiceImpl emailService;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(jwt);
        User user=findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void activateUser(String email, String otp) {
        User user  = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        Otp savedOtp=otpRepository.findTopByUserOrderByExpirationTimeDesc(user)
                .orElseThrow(() -> new CustomException("OTP not found"));

        if(!savedOtp.getOtp().equals(otp))
            throw new CustomException("Invalid OTP");

        if(savedOtp.getExpirationTime().isBefore(LocalDateTime.now()))
            throw new CustomException("OTP expired");

        user.setEnabled(true);
        userRepository.save(user);

        otpRepository.delete(savedOtp);

    }

    @Override
    public void forgetPassword(String email) {

        User user = userRepository.getUserByEmail(email);

        if (user == null) {
            throw new CustomException("Email not found");
        }

        if (!user.isEnabled()) {
            throw new CustomException("Account not activated. Please activate your account first.");
        }

        // إرسال OTP فقط لو الحساب مفعل
        Otp otp = otpService.generateOtp(user);
        otpRepository.save(otp);

        emailService.sendOtpMsg(
                user.getEmail(),
                "Password Reset Code",
                otp.getOtp()
        );
    }



    @Override
    @Transactional
    public void changePassword(String resetToken, String newPassword) {

        User user = userRepository.findByResetToken(resetToken)
                .orElseThrow(() -> new CustomException("Invalid token"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);
    }





    @Override
    @Transactional
    public String verifyOtp(String email, String otpCode) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        Otp otp = otpRepository.findByUserAndOtp(user, otpCode)
                .orElseThrow(() -> new CustomException("Invalid OTP"));

        if (otp.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new CustomException("OTP expired");
        }

        // توليد reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        userRepository.save(user);

        // حذف OTP بعد التحقق
        otpRepository.delete(otp);

        return resetToken;
    }

    @Override
    public void resendActivationOtp(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        if (user.isEnabled()) {
            throw new CustomException("Account already activated");
        }


        otpRepository.deleteByUser(user);
        Otp otp = otpService.generateOtp(user);
        otpRepository.save(otp);

        emailService.sendOtpMsg(
                user.getEmail(),
                "Account Activation Code",
                otp.getOtp()
        );
    }

    @Override
    public void resendResetOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));


        otpRepository.deleteByUser(user);
        Otp otp = otpService.generateOtp(user);
        otpRepository.save(otp);

        emailService.sendOtpMsg(
                user.getEmail(),
                "Account Activation Code",
                otp.getOtp()
        );
    }

    @Override
    @Transactional
    public void deleteUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        userRepository.delete(user);
    }
}
