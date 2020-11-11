# API Reference

## Product

### Create Via UI Input

```
POST /products
Accept: application/json
Content-Type: application/json

{
    "code": "HKTV-APPL * 3",
    "name": "Apple",
    "weight": 100,
    "unit": "g"
}
```

### Create Via Upload Csv

```
POST /products/upload
Accept: multipart/form-data
Content-Type: multipart/form-data

file = "<File>"
```

### Get Products List

```
GET /products
```

### Get Specify Product

```
GET /products/<code>
```

### Delete Product

```
DELETE /products/<code>
```

### Upload Partial Fields

```
PATCH /products/<code>
Accept: application/json
Content-Type: application/json

{
    ...
}
```

## Inventory

### Create Inventory

```
POST /inventories
Accept: application/json
Content-Type: application/json

{
    "code": "YL",
    "name": "Yuen Long Inventory"
}
```

### Get Inventory List

```
GET /inventories
```

### Get Specify Inventory Detail

```
GET /inventories/<code>
```

### Add Product to Inventory Via Csv

```
POST /inventories/upload
Accept: multipart/form-data
Content-Type: multipart/form-data

file = "<File>"
```

### Transfer Stock from Inventory to another Inventory

```
POST /inventories/<source inventory code>/transfer
Accept: application/json
Content-Type: application/json

{
    "destination": "TSW",
    "productCode": "T-01",
    "qty": 3
}
```

## Stock

### Get All Product Stock with Inventory Status

```
GET /stocks
```


## Transfer stock from one inventory to another Via Csv
```
POST /transfer
Accept: multipart/form-data
Content-Type: multipart/form-data

file = "<File>"
```
