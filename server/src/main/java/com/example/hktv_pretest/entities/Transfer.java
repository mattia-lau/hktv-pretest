package com.example.hktv_pretest.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Transfer")
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column()
    private int qty;

    @Column(name = "created_at")
    @CreationTimestamp
    public LocalDateTime createdAt;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Stock from;

    @ManyToOne
    private Stock to;

    public Transfer() {
    }

    public Transfer(Product product, Stock from, Stock to, int qty) {
        this.product = product;
        this.from = from;
        this.to = to;
        this.qty = qty;
    }

    public Transfer(Product product, Stock from, Stock to, int qty, LocalDateTime createdAt) {
        this(product, from, to, qty);
        this.createdAt = createdAt;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public Stock getFrom() {
        return from;
    }

    public void setFrom(Stock from) {
        this.from = from;
    }

    public Stock getTo() {
        return to;
    }

    public void setTo(Stock to) {
        this.to = to;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
