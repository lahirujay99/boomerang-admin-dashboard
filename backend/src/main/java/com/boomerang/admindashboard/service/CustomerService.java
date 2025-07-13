package com.boomerang.admindashboard.service;

import com.boomerang.admindashboard.domain.Customer;
import com.boomerang.admindashboard.dto.CustomerDTO;
import com.boomerang.admindashboard.mappers.ModelMapper;
import com.boomerang.admindashboard.repository.CustomerRepository;
import com.boomerang.admindashboard.domain.Customer;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import com.boomerang.admindashboard.repository.SaleRepository;
import jakarta.transaction.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SaleRepository saleRepository;

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

    /**
     * Deletes a customer and all of their associated sales in a single transaction.
     * @param customerId The ID of the customer to delete.
     */
    @Transactional // This is crucial. It makes the entire method a single database transaction.
    public void deleteCustomer(Long customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new EntityNotFoundException("Customer with ID " + customerId + " not found.");
        }

        // Step 1: Explicitly delete all sales associated with the customer.
        saleRepository.deleteByCustomerId(customerId);

        // Step 2: Now that child records are gone, delete the customer itself.
        customerRepository.deleteById(customerId);
    }

    /**
     * Updates an existing customer's details.
     * @param customerId The ID of the customer to update.
     * @param customerDTO A DTO containing the new data.
     * @return The updated customer as a DTO.
     */
    public CustomerDTO updateCustomer(Long customerId, CustomerDTO customerDTO) {
        // Find the existing customer, or throw an exception if not found.
        Customer customerToUpdate = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer with ID " + customerId + " not found."));

        // Update the entity's fields with the data from the DTO.
        customerToUpdate.setFullName(customerDTO.getFullName());
        customerToUpdate.setEmail(customerDTO.getEmail());

        // Save the updated entity back to the database.
        Customer updatedCustomer = customerRepository.save(customerToUpdate);

        // Return the result as a DTO.
        return modelMapper.toCustomerDTO(updatedCustomer);
    }
}