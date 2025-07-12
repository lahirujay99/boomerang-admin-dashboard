package com.boomerang.admindashboard.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CustomerDTO {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate joinDate;
    private Double totalSpend;
}