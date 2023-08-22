import { productsModel } from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model = productsModel
    }

    async getProducts(){
        try {
            const getProducts = await this.model.find().lean()
            return getProducts
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos")
        }
    }

    async getProductsWithPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options)
            return result
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos")
        }
    }

    async getProductById(idProducto){
        try {
            const getProductById = await this.model.findById(idProducto)
            return getProductById
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos")
        }
    }

    async addProduct(productInfo){
        try {
            const addProduct = await this.model.create(productInfo)
            return addProduct
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al crear el producto")
        }
    }

    async updateProduct(idProducto, data){
        try {
            const updateProduct = await this.model.findByIdAndUpdate(idProducto,data)
            return updateProduct
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al actualizar el producto")
        }
    }

    async deleteProduct(idProducto){
        try {
            const deleteProduct = await this.model.findByIdAndDelete(idProducto)
            return deleteProduct
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al actualizar el producto")
        }
    }
}