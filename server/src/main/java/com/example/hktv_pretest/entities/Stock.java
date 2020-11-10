package com.example.hktv_pretest.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "qty")
    private int qty;

    @ManyToOne
    @JsonIgnoreProperties(value = { "stocks" }, allowSetters = true)
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("stocks")
    private Inventory inventory;

    public Stock() {
    }

    public Stock(Product product, int qty, Inventory inventory) {
        this.product = product;
        this.qty = qty;
        this.inventory = inventory;
    }

    public int getId() {
        return id;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
}
