package com.boomerang.admindashboard.service;

import com.boomerang.admindashboard.domain.Customer;
import com.boomerang.admindashboard.dto.CustomerDTO;
import com.boomerang.admindashboard.mappers.ModelMapper;
import com.boomerang.admindashboard.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Retrieves all customers from the database and converts them to a list of DTOs.
     * @return A list of CustomerDTOs.
     */
    public List<CustomerDTO> findAllCustomers() {
        return customerRepository.findAll()
                .stream()                       // Create a stream from the list of Customer entities
                .map(modelMapper::toCustomerDTO)  // For each customer, convert it to a CustomerDTO
                .collect(Collectors.toList());    // Collect the results back into a new list
    }
}