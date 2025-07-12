package com.boomerang.admindashboard.mappers;

import com.boomerang.admindashboard.domain.Customer;
import com.boomerang.admindashboard.domain.Sale;
import com.boomerang.admindashboard.dto.CustomerDTO;
import com.boomerang.admindashboard.dto.SaleDTO;
import org.springframework.stereotype.Component;

@Component
public class ModelMapper {

    public CustomerDTO toCustomerDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setFullName(customer.getFullName());
        dto.setEmail(customer.getEmail());
        dto.setJoinDate(customer.getJoinDate());
        dto.setTotalSpend(customer.getTotalSpend());
        return dto;
    }

    public SaleDTO toSaleDTO(Sale sale) {
        SaleDTO dto = new SaleDTO();
        dto.setId(sale.getId());
        dto.setCustomerId(sale.getCustomer().getId());
        dto.setCustomerName(sale.getCustomer().getFullName());
        dto.setTransactionDate(sale.getTransactionDate());
        dto.setAmount(sale.getAmount());
        dto.setStatus(sale.getStatus());
        return dto;
    }
}