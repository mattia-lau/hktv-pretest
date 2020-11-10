package com.example.hktv_pretest.repositories;

import com.example.hktv_pretest.entities.Inventory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findByCode(String code);
}
