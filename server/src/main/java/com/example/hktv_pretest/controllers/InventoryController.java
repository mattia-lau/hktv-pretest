package com.example.hktv_pretest.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.example.hktv_pretest.dto.TransferDto;
import com.example.hktv_pretest.entities.Inventory;
import com.example.hktv_pretest.entities.Product;
import com.example.hktv_pretest.entities.Stock;
import com.example.hktv_pretest.entities.Transfer;
import com.example.hktv_pretest.exceptions.InvalidArgumentException;
import com.example.hktv_pretest.exceptions.RecordExistException;
import com.example.hktv_pretest.exceptions.RecordNotFoundException;
import com.example.hktv_pretest.repositories.InventoryRepository;
import com.example.hktv_pretest.repositories.ProductRepository;
import com.example.hktv_pretest.repositories.StockRepository;
import com.example.hktv_pretest.repositories.TransferRepository;
import com.example.hktv_pretest.utils.CsvReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/inventories")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private TransferRepository transferRepository;

    @GetMapping
    public List<Inventory> getInventories() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/{code}")
    public Inventory getInventory(@PathVariable("code") String code) {
        return inventoryRepository.findByCode(code);
    }

    @PostMapping
    public Inventory createInventory(@Valid @RequestBody Inventory inventory) throws RecordExistException {
        Inventory exists = inventoryRepository.findByCode(inventory.getCode());

        if (exists != null) {
            throw new RecordExistException();
        }

        return inventoryRepository.save(inventory);
    }

    @PostMapping("/upload")
    public List<Stock> createProducts(@RequestParam("file") MultipartFile file) throws IOException {
        List<String> lines = CsvReader.readCsv(file.getInputStream());
        List<Stock> result = new ArrayList<>();

        for (String line : lines) {
            String[] split = line.split(",");

            if (split.length != 3) {
                continue;
            }

            Inventory inventory = this.inventoryRepository.findByCode(split[0]);
            Product product = this.productRepository.findByCode(split[1]);
            if (inventory == null || product == null) {
                continue;
            }

            Stock source = this.stockRepository.findByProductAndInventoryCode(product, inventory);

            if (source == null) {
                source = this.stockRepository.save(new Stock(product, 0, inventory));
            }

            source.setQty(source.getQty() + Integer.parseInt(split[2]));

            result.add(stockRepository.save(source));
        }
        return result;
    }

    @PostMapping("/{code}/transfer")
    public Transfer transfer(@PathVariable("code") String code, @Valid @RequestBody TransferDto dto)
            throws RecordNotFoundException, InvalidArgumentException {
        Inventory source = inventoryRepository.findByCode(code);
        Product product = productRepository.findByCode(dto.getProductCode());
        if (source == null || product == null) {
            throw new RecordNotFoundException();
        }

        Stock stock = stockRepository.findByProductAndInventoryCode(product, source);
        if (stock == null) {
            throw new RecordNotFoundException();
        }

        if (stock.getQty() < dto.getQty()) {
            throw new InvalidArgumentException();
        }

        Inventory dest = inventoryRepository.findByCode(dto.getDestination());
        Stock destStock = stockRepository.findByProductAndInventoryCode(product, dest);
        if (destStock == null) {
            destStock = new Stock(product, 0, dest);
        }

        stock.setQty(stock.getQty() - dto.getQty());
        destStock.setQty(destStock.getQty() + dto.getQty());

        stockRepository.save(stock);
        stockRepository.save(destStock);
        return transferRepository.save(new Transfer(product, stock, destStock, dto.getQty()));
    }

}
