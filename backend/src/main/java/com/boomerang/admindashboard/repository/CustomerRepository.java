package com.boomerang.admindashboard.repository;

import com.boomerang.admindashboard.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository // Marks this interface as a Spring repository bean
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Spring Data JPA can automatically create queries from method names.
     * This method will find all customers who joined after a specific date.
     * For example: findBy<FieldName><Condition>
     *
     * @param date The date to compare against.
     * @return A list of customers.
     */
    List<Customer> findByJoinDateAfter(LocalDate date);

    /**
     * Counts how many customers joined after a specific date.
     *
     * @param date The date to compare against.
     * @return The count of new customers.
     */
    long countByJoinDateAfter(LocalDate date);
}