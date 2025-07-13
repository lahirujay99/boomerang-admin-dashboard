package com.boomerang.admindashboard.repository;

import com.boomerang.admindashboard.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal; // <-- IMPORT THIS

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    /**
     * A custom query using JPQL (Java Persistence Query Language) to calculate
     * the sum of the 'amount' for all sales.
     * The 'COALESCE' function ensures we return 0.0 if there are no sales yet.
     * The return type is now BigDecimal.
     *
     * @return The total sum of all sales amounts.
     */
    @Query("SELECT COALESCE(SUM(s.amount), 0.0) FROM Sale s")
    BigDecimal findTotalSales(); // <-- CHANGE RETURN TYPE TO BigDecimal

    // This allows us to delete all sales records belonging to a specific customer ID.
    void deleteByCustomerId(Long customerId);
}