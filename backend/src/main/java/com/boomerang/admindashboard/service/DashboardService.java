package com.boomerang.admindashboard.service;

import com.boomerang.admindashboard.dto.DashboardStatsDTO;
import com.boomerang.admindashboard.repository.CustomerRepository;
import com.boomerang.admindashboard.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public DashboardStatsDTO getDashboardStats() {
        // Use the custom query created in SaleRepository
        BigDecimal totalSales = saleRepository.findTotalSales();

        // Count all sales records to get total bookings
        long totalBookings = saleRepository.count();

        // Get the date 30 days ago to find new customers this month
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);
        long newCustomersThisMonth = customerRepository.countByJoinDateAfter(oneMonthAgo);

        return new DashboardStatsDTO(totalSales, totalBookings, newCustomersThisMonth);
    }
}