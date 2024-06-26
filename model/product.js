export default class Product {
    constructor(id, name, gtin, price, image, brand, store, barcode) {
        this.id = id;
        this.name = name;
        this.gtin = gtin;
        this.price = price;
        this.image = image;
        this.brand = brand;
        this.store = store;
        this.barcode_image = barcode;
    }
}
