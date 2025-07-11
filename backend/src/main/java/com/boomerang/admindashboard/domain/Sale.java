package com.boomerang.admindashboard.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This defines a many-to-one relationship. Many sales can belong to one customer.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false) // Defines the foreign key column
    private Customer customer;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private Double amount;

    // This tells JPA to store the enum value as a String (e.g., "COMPLETED")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SaleStatus status;
}


/*@ManyToOne: This is crucial. It defines the relationship between Sale and Customer. Many Sale records can be linked to one Customer.
@JoinColumn: Specifies the foreign key column (customer_id) in the sales table that links to the customers table.
@Enumerated(EnumType.STRING): Ensures the status is saved as a readable string ("COMPLETED", "PENDING") in the database, not as a number.*/