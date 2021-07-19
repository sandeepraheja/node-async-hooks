import { Model, Table, Column, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Optional } from "sequelize";

interface ProductAttributes {
    id: number
    name: string,
    description: string,
    category: string,
    price: number,
    active: boolean,
    readonly createdAt: Date,
    readonly updatedAt: Date
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

@Table({
    tableName: "product_catalog"
})
export default class Product extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        field: 'product_name'
    })
    name: string

    @Column({
        type: DataType.STRING,
        field: 'product_description'
    })
    description: string

    @Column({
        type: DataType.STRING,
        field: 'product_category'
    })
    category: string

    @Column({
        field: 'product_price'
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    active: boolean

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: 'created_at'
    })
    createdAt: Date

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: 'updated_at'
    })
    updatedAt: Date
}