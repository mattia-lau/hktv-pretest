package com.example.hktv_pretest.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.example.hktv_pretest.entities.Product;
import com.example.hktv_pretest.enums.ProductUnit;
import com.example.hktv_pretest.exceptions.RecordExistException;
import com.example.hktv_pretest.exceptions.RecordNotFoundException;
import com.example.hktv_pretest.repositories.ProductRepository;
import com.example.hktv_pretest.utils.CsvReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{code}")
    public Product getProduct(@PathVariable("code") String code) throws RecordNotFoundException {

        Product exist = productRepository.findByCode(code);

        if (exist == null) {
            throw new RecordNotFoundException();
        }

        return exist;
    }

    @PostMapping
    public Product createProduct(@Valid @RequestBody Product product) throws RecordExistException {
        Product exist = productRepository.findByCode(product.getCode());

        if (exist != null) {
            throw new RecordExistException();
        }

        return productRepository.save(product);
    }

    @PostMapping("/upload")
    public List<Product> createProducts(@RequestParam("file") MultipartFile file) throws IOException {
        List<String> products = CsvReader.readCsv(file.getInputStream());
        List<Product> createdProducts = new ArrayList<>();
        for (String product : products) {
            String[] splitedProduct = product.split(",");
            Product productOpt = productRepository.findByCode(splitedProduct[0]);

            if (productOpt == null) {
                Product p = new Product(splitedProduct[0], splitedProduct[1], Integer.parseInt(splitedProduct[2]),
                        ProductUnit.valueOf(splitedProduct[3]));
                productRepository.save(p);
                createdProducts.add(p);
            }
        }
        return createdProducts;
    }

    @PatchMapping("/{code}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("code") String code)
            throws RecordNotFoundException {

        Product exist = productRepository.findByCode(code);

        if (exist == null) {
            throw new RecordNotFoundException();
        }

        return productRepository.save(exist);
    }

    @DeleteMapping("/{code}")
    public boolean deleteProduct(@PathVariable("code") String code) throws RecordNotFoundException {
        Product exist = productRepository.findByCode(code);

        if (exist == null) {
            throw new RecordNotFoundException();
        }

        productRepository.delete(exist);

        return true;
    }
}
