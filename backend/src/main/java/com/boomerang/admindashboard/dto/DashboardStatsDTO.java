package com.boomerang.admindashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {
    private double totalSales;
    private long totalBookings; // Assuming total bookings == total sales records for now
    private long newCustomersThisMonth;
}