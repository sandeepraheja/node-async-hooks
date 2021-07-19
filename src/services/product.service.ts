import { IAppAsyncContext } from "../api.models/async.context";
import { BaseInjectable } from "../base.injectable";
import Product from "../db/models/product.model";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService extends BaseInjectable {
    private productRepo: ProductRepository
    constructor() {
        super()
        this.productRepo = new ProductRepository()
    }

    public async getProducts(data:IAppAsyncContext) {
        this.compare(data, "ProductService")
        return await this.productRepo.getProducts(data)
    }

    public async getProductById(id:number, data:IAppAsyncContext) {
        this.compare(data, "ProductService")
        return await this.productRepo.getProductById(id, data)
    }

    public async addProduct(product:Product, data:IAppAsyncContext) {
        this.compare(data, "ProductService")
        return await this.productRepo.addProduct(product, data)
    }

    public async updateProductById(id:number, productData:Product, data:IAppAsyncContext) {
        this.compare(data, "ProductService")
        return await this.productRepo.updateProductById(id, productData, data)
    }
}