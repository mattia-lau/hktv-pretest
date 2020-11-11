package com.example.hktv_pretest.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.hktv_pretest.entities.Inventory;
import com.example.hktv_pretest.entities.Product;
import com.example.hktv_pretest.entities.Stock;
import com.example.hktv_pretest.entities.Transfer;
import com.example.hktv_pretest.exceptions.InvalidArgumentException;
import com.example.hktv_pretest.repositories.InventoryRepository;
import com.example.hktv_pretest.repositories.ProductRepository;
import com.example.hktv_pretest.repositories.StockRepository;
import com.example.hktv_pretest.repositories.TransferRepository;
import com.example.hktv_pretest.utils.CsvReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/transfers")
public class TransferController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private TransferRepository transferRepository;

    @GetMapping()
    public List<Transfer> getHistory() {
        return transferRepository.findAll();
    }

    @PostMapping("/upload")
    public List<Transfer> createProducts(@RequestParam("file") MultipartFile file)
            throws IOException, InvalidArgumentException {
        List<String> lines = CsvReader.readCsv(file.getInputStream());
        List<Transfer> result = new ArrayList<>();

        for (String line : lines) {
            String[] split = line.split(",");

            if (split.length != 4) {
                throw new InvalidArgumentException();
            }

            String sourceCode = split[0];
            String destCode = split[1];
            String productCode = split[2];
            int qty = Integer.parseInt(split[3]);

            Inventory source = inventoryRepository.findByCode(sourceCode);
            Product product = productRepository.findByCode(productCode);
            if (source == null || product == null) {
                continue;
            }

            Stock sourceStock = stockRepository.findByProductAndInventoryCode(product, source);
            if (sourceStock == null) {
                continue;
            }

            if (sourceStock.getQty() < qty) {
                continue;
            }

            Inventory dest = inventoryRepository.findByCode(destCode);
            Stock destStock = stockRepository.findByProductAndInventoryCode(product, dest);
            if (destStock == null) {
                destStock = new Stock(product, 0, dest);
            }

            sourceStock.setQty(sourceStock.getQty() - qty);
            destStock.setQty(destStock.getQty() + qty);

            stockRepository.save(sourceStock);
            stockRepository.save(destStock);
            result.add(transferRepository.save(new Transfer(product, sourceStock, destStock, qty)));
        }
        return result;
    }

}
