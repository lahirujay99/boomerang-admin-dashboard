package com.boomerang.admindashboard.config;

import com.boomerang.admindashboard.domain.AdminUser;
import com.boomerang.admindashboard.domain.Customer;
import com.boomerang.admindashboard.domain.Sale;
import com.boomerang.admindashboard.domain.SaleStatus;
import com.boomerang.admindashboard.repository.AdminUserRepository;
import com.boomerang.admindashboard.repository.CustomerRepository;
import com.boomerang.admindashboard.repository.SaleRepository;
import com.boomerang.admindashboard.domain.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (adminUserRepository.count() == 0) {
            System.out.println("--- Loading Sample Data ---");
            loadData();
            System.out.println("--- Sample Data Loaded ---");
        } else {
            System.out.println("--- Database already populated. Skipping data loading. ---");
        }
    }

    private void loadData() {
        adminUserRepository.save(new AdminUser(null, "admin@test.com", passwordEncoder.encode("password"), "ROLE_ADMIN"));

        // ** THE FIX IS HERE: Add 'null' as the last argument for the new 'sales' field **
        Customer cust1 = new Customer(null, "Liam Harper", "liam.harper@email.com", LocalDate.of(2022, 1, 15), new BigDecimal("500.00"), null);
        Customer cust2 = new Customer(null, "Olivia Bennett", "olivia.bennett@email.com", LocalDate.of(2022, 2, 20), new BigDecimal("750.00"), null);
        Customer cust3 = new Customer(null, "Noah Carter", "noah.carter@email.com", LocalDate.of(2022, 3, 10), new BigDecimal("300.00"), null);
        Customer cust4 = new Customer(null, "Ava Mitchell", "ava.mitchell@email.com", LocalDate.of(2024, 6, 5), new BigDecimal("1200.00"), null);
        Customer cust5 = new Customer(null, "Ethan Parker", "ethan.parker@email.com", LocalDate.of(2024, 7, 1), new BigDecimal("900.00"), null);

        List<Customer> customers = customerRepository.saveAll(Arrays.asList(cust1, cust2, cust3, cust4, cust5));

        Sale sale1 = new Sale(null, customers.get(0), LocalDate.of(2024, 1, 15), new BigDecimal("150.00"), SaleStatus.COMPLETED);
        Sale sale2 = new Sale(null, customers.get(1), LocalDate.of(2024, 1, 16), new BigDecimal("200.00"), SaleStatus.PENDING);
        Sale sale3 = new Sale(null, customers.get(2), LocalDate.of(2024, 1, 17), new BigDecimal("75.00"), SaleStatus.CANCELLED);
        Sale sale4 = new Sale(null, customers.get(3), LocalDate.of(2024, 6, 18), new BigDecimal("300.00"), SaleStatus.COMPLETED);
        Sale sale5 = new Sale(null, customers.get(4), LocalDate.of(2024, 7, 2), new BigDecimal("120.00"), SaleStatus.PENDING);
        Sale sale6 = new Sale(null, customers.get(0), LocalDate.of(2024, 5, 19), new BigDecimal("180.00"), SaleStatus.COMPLETED);

        saleRepository.saveAll(Arrays.asList(sale1, sale2, sale3, sale4, sale5, sale6));
    }
}