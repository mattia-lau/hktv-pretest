package com.example.hktv_pretest.dto;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TransferDto {
    @NotEmpty(message = "Product Code is mandatory")
    private String productCode;

    @NotNull(message = "Quantity is mandatory")
    @DecimalMin(value = "1")
    private int qty;

    @NotEmpty(message = "Destination is mandatory")
    private String destination;

    public TransferDto(String productCode, int qty, String destination) {
        this.productCode = productCode;
        this.qty = qty;
        this.destination = destination;
    }
    
    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
