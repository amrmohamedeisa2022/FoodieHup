package com.myApp.controller;

import com.myApp.config.JwtProvider;
import com.myApp.exceptions.CustomException;
import com.myApp.model.*;
import com.myApp.repository.CartRepository;
import com.myApp.repository.OtpRepository;
import com.myApp.repository.ResturentRepositry;
import com.myApp.repository.UserRepository;
import com.myApp.request.LoginRequest;
import com.myApp.response.AuthResponse;
import com.myApp.service.CustomerUserDetailsService;
import com.myApp.service.EmailServiceImpl;
import com.myApp.service.OtpService;
import com.myApp.service.UserService;
import io.jsonwebtoken.JwtParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
private ResturentRepositry resturentRepositry;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailServiceImpl emailService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/signup")
    public ResponseEntity<String> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExists = userRepository.getUserByEmail(user.getEmail());
        if (isEmailExists != null) {
            throw new CustomException("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setEnabled(false);

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        // توليد OTP
        Otp otp = otpService.generateOtp(savedUser);
        otpRepository.save(otp);

        // إرسال OTP
        emailService.sendOtpMsg(
                savedUser.getEmail(),
                "Account Activation Code",
                otp.getOtp()
        );

        return new ResponseEntity<>("Account created. Please verify OTP sent to your email.", HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req){

        String username = req.getEmail();
        String password = req.getPassword();
        Authentication authentication = authenticate(username,password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()? null : authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        User user = userRepository.getUserByEmail(username);

        // ⭐⭐ السطرين المهمين
        Restaurant restaurant =
                resturentRepositry.findByOwnerId(user.getId());
        boolean hasRestaurant = restaurant != null;

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setFullName(user.getFullName());
        authResponse.setRole(User_Role.valueOf(role));
        authResponse.setHasRestaurant(hasRestaurant); // ⭐

        if (restaurant != null) {
            authResponse.setRestaurantId(restaurant.getId());
        }
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }



    private Authentication authenticate(String username, String password) {

        UserDetails userDetails=customerUserDetailsService.loadUserByUsername(username);

        if(userDetails==null){
            throw new BadCredentialsException("invalid username...");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("invalid password...");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
    }




}
