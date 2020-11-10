package com.example.hktv_pretest.repositories;

import com.example.hktv_pretest.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByCode(String code);
}