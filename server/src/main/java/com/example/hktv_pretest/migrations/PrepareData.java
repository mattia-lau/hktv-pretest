package com.example.hktv_pretest.migrations;

import com.example.hktv_pretest.entities.Inventory;
import com.example.hktv_pretest.entities.Product;
import com.example.hktv_pretest.entities.Stock;
import com.example.hktv_pretest.enums.ProductUnit;
import com.example.hktv_pretest.repositories.InventoryRepository;
import com.example.hktv_pretest.repositories.ProductRepository;
import com.example.hktv_pretest.repositories.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class PrepareData {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProductRepository productRepository;

    @EventListener
    public void onAppReady(ApplicationReadyEvent event) {
        Inventory inventory = inventoryRepository.save(new Inventory("YL", "Yuen Long"));

        // Product
        Product product = productRepository.save(new Product("T-01", "Face Mask", 100, ProductUnit.G));

        // Stock
        if (stockRepository.findByProductAndInventoryCode(product, inventory) == null) {
            Stock stock = stockRepository.save(new Stock(product, 5, inventory));
        }
    }
}
