package com.example.hktv_pretest.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.hktv_pretest.enums.ProductUnit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Product")
public class Product {
    @Id
    @Column(name = "code", unique = true, nullable = false)
    @NotEmpty(message = "Code is mandatory")
    private String code;

    @Column(name = "name", nullable = false)
    @NotEmpty(message = "Name is mandatory")
    private String name;

    @Column(name = "weight", nullable = false)
    @NotNull(message = "Weight is mandatory")
    @DecimalMin(value = "0")
    private int weight;

    @Enumerated(EnumType.ORDINAL)
    @NotNull(message = "Weight is mandatory")
    private ProductUnit unit;

    @OneToMany(mappedBy = "product", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "stock" }, allowSetters = true)
    private Set<Stock> stocks;

    public Product() {
    }

    public Product(String code, String name, int weight, ProductUnit unit) {
        this.code = code;
        this.name = name;
        this.weight = weight;
        this.unit = unit;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public ProductUnit getUnit() {
        return unit;
    }

    public void setUnit(ProductUnit unit) {
        this.unit = unit;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
}
