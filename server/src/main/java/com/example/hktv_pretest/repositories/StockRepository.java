package com.example.hktv_pretest.repositories;

import com.example.hktv_pretest.entities.Inventory;
import com.example.hktv_pretest.entities.Product;
import com.example.hktv_pretest.entities.Stock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
    @Query("SELECT s FROM Stock s where s.product = :product AND s.inventory = :inventory")
    Stock findByProductAndInventoryCode(@Param("product") Product product, @Param("inventory") Inventory inventory);
}
