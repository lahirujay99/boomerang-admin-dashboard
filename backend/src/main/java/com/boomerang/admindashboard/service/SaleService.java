package com.boomerang.admindashboard.service;

import com.boomerang.admindashboard.dto.SaleDTO;
import com.boomerang.admindashboard.mappers.ModelMapper;
import com.boomerang.admindashboard.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Retrieves all sales from the database and converts them to a list of DTOs.
     * @return A list of SaleDTOs.
     */
    public List<SaleDTO> findAllSales() {
        return saleRepository.findAll()
                .stream()
                .map(modelMapper::toSaleDTO)
                .collect(Collectors.toList());
    }
}