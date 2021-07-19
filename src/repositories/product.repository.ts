import { IAppAsyncContext } from "../api.models/async.context";
import { BaseInjectable } from "../base.injectable";
import Product from '../db/models/product.model'

export class ProductRepository extends BaseInjectable {

    constructor() {
        super()
    }

    public async getProducts(data:IAppAsyncContext) {
        this.compare(data, "ProductRepository")
        return await Product.findAll()
    }

    public async getProductById(id:number, data:IAppAsyncContext) {
        this.compare(data, "ProductRepository")
        return await Product.findByPk(id)
    }

    public async addProduct(product:Product, data:IAppAsyncContext) {
        this.compare(data, "ProductRepository")
        return await Product.create(product)
    }

    public async updateProductById(id:number, product:Product, data:IAppAsyncContext) {
        this.compare(data, "ProductRepository")
        // const oldProduct = await Product.findByPk(id)
        // const newProduct = {...oldProduct, ...product}
        await Product.update(product, {
            where: {
                id: id
            }
        })
        await product.reload()
        return Promise.resolve(product)
    }
}