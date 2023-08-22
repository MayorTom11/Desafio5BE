import {cartsModel} from "../../models/carts.model.js"

export class CartsMongo {
    constructor(){
        this.model = cartsModel
    }

    async getCarts(){
        try {
            const getCarts = await this.model.find()
            return getCarts
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los carritos")
        }
    }

    async getProductsInCart(CartId){
        try {
            const getProductsInCart = await this.model.findById(CartId).populate("products")
            return getProductsInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos del carrito")
        }
    }

    async addCart(cartInfo){
        try {
            const addCart = await this.model.create(cartInfo)
            return addCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al crear el carrito")
        }
    }

    async updateCart(cartId, newCart){
        try {
            const updateCart = await this.model.findByIdAndUpdate(cartId,{$push:{products:{productId:newCart.productId,quantity:newCart.quantity}}})
            return updateCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al crear el carrito")
        }
    }

    async updateProductsInCart(cartId, productId, quantity){
        try {
            const updateProductsInCart = await this.model.findByIdAndUpdate(cartId,{$push:{products:{quantity:quantity}}})
            return updateProductsInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos del carrito")
        }
    }

    async deleteProductInCart(cartId, productId){
        try {
            const deleteProductInCart = await this.model.findByIdAndUpdate(cartId, {$pull:{products:{productId:productId}}})
            return deleteProductInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al eliminar el producto del carrito")
        }
    }

    async deleteCart(cartId){
        try {
            const deleteCart = await this.model.findByIdAndDelete(cartId)
            return deleteCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al eliminar el carrito")
        }
    }
}