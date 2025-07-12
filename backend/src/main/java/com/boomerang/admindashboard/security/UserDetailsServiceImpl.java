package com.boomerang.admindashboard.security;

import com.boomerang.admindashboard.domain.AdminUser;
import com.boomerang.admindashboard.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find the admin user by email from the database
        AdminUser adminUser = adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Create a Spring Security User object
        return new User(
                adminUser.getEmail(),
                adminUser.getPassword(),
                // The third argument is a collection of authorities (roles)
                Collections.singletonList(new SimpleGrantedAuthority(adminUser.getRole()))
        );
    }
}