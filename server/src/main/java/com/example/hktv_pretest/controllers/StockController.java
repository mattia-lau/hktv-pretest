package com.example.hktv_pretest.controllers;

import java.util.List;

import com.example.hktv_pretest.entities.Stock;
import com.example.hktv_pretest.repositories.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/stocks")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @GetMapping
    public List<Stock> getStocks() {
        return stockRepository.findAll();
    }
}
