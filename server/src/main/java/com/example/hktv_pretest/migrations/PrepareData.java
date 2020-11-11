package com.example.hktv_pretest.migrations;

import com.example.hktv_pretest.entities.Inventory;
import com.example.hktv_pretest.repositories.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class PrepareData {

    @Autowired
    private InventoryRepository inventoryRepository;

    @EventListener
    public void onAppReady(ApplicationReadyEvent event) {
        inventoryRepository.save(new Inventory("YL", "Yuen Long"));
        inventoryRepository.save(new Inventory("CWB", "Causeway Bay"));
        inventoryRepository.save(new Inventory("TM", "Tuen Mun"));
        inventoryRepository.save(new Inventory("CW", "Chai Wan"));
        inventoryRepository.save(new Inventory("ST", "Sha Tin"));
        inventoryRepository.save(new Inventory("YTM", "Yau Tsim Mong"));
        inventoryRepository.save(new Inventory("KT", "Kwun Tong"));
        inventoryRepository.save(new Inventory("HH", "Hung Hom"));
    }
}
