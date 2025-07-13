package com.boomerang.admindashboard.repository;

import com.boomerang.admindashboard.domain.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    /**
     * Finds a user by their email address. use this for authentication.
     * It returns an Optional, which is a good practice to handle cases where
     * the user might not exist, avoiding NullPointerExceptions.
     *
     * @param email The user's email to search for.
     * @return An Optional containing the AdminUser if found, or an empty Optional if not.
     */
    Optional<AdminUser> findByEmail(String email);
}