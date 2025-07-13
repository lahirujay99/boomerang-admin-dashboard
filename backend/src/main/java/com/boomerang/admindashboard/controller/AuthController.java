package com.boomerang.admindashboard.controller;

import com.boomerang.admindashboard.dto.LoginRequest;
import com.boomerang.admindashboard.dto.LoginResponse;
import com.boomerang.admindashboard.security.JwtUtil;
import com.boomerang.admindashboard.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) throws Exception {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // If authentication is successful, load the user details and generate a JWT
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        // Return the token in the response
        return ResponseEntity.ok(new LoginResponse(token));
    }
}