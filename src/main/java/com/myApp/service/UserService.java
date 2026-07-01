package com.myApp.service;

import com.myApp.model.User;
import jdk.jshell.spi.ExecutionControl;

public interface UserService {

    public User findUserByJwtToken(String jwt)throws Exception;
    public User findUserByEmail(String email)throws Exception;
    void forgetPassword(String email);
    void changePassword(String token, String newPassword);
    void activateUser(String email, String otp);
    String verifyOtp(String email, String otp);
    void resendActivationOtp(String email);
    void resendResetOtp(String email);
    void deleteUser(String email);


}
