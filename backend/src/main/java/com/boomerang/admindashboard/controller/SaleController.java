package com.boomerang.admindashboard.controller;

import com.boomerang.admindashboard.dto.SaleDTO;
import com.boomerang.admindashboard.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleDTO>> getAllSales() {
        return ResponseEntity.ok(saleService.findAllSales());
    }
}