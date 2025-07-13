package com.boomerang.admindashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {
    private BigDecimal totalSales;
    private long totalBookings; // Assuming total bookings == total sales records
    private long newCustomersThisMonth;
}