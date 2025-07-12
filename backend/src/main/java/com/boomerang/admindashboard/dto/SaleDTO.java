package com.boomerang.admindashboard.dto;

import com.boomerang.admindashboard.domain.SaleStatus;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
public class SaleDTO {
    private Long id;
    private Long customerId;
    private String customerName;
    private LocalDate transactionDate;
    private BigDecimal amount;
    private SaleStatus status;
}
