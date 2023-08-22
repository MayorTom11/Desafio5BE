import { Router } from "express";
import { ProductsMongo } from "../managers/Mongo/productsMongo.js";
import { CartsMongo } from "../managers/Mongo/cartsMongo.js";

const router = Router()
const productService = new ProductsMongo()
const cartService = new CartsMongo()

router.get("/",async(req,res)=>{
    res.render("login")
})

router.get("/registro",async(req,res)=>{
    res.render("signup")
})

router.get("/login",async(req,res)=>{
    res.render("login")
})

router.get("/products",async(req,res)=>{
    try {
        // Capturar los valores de los querys
        const {limit=10, page=1, stock,sort} = req.query
        const stockValue = stock === 0 ? undefined : parseInt(stock)
        if(!["asc","desc"].includes(sort)){
            return res.render("products",{error:"Orden no valido"})
        }
        const sortValue = sort === "asc" ? 1 : -1
        let query = {}
        if(stockValue){
            query = {category:"",stock:{$gte:stockValue}}
        }
        const result = await productService.getProductsWithPaginate(query, {page,limit,sort:{price:sortValue},lean:true})
        // Capturar el http
        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
        const resultProductsView = {
            status:"success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`,`page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`,`page=${result.nextPage}`)}` : null,
        }
        res.render("products", {user:req.session.userInfo} ,resultProductsView)
        console.log(req.session.userInfo)
    } catch (error) {
        res.render("products",{error:"No es posible visualizar los datos"})
    }
})

router.get("/carts",async(req,res)=>{
    try {
        await cartService.getCarts()
        res.render("carts")
    } catch (error) {
        res.render("carts",{error:"No se encontraron carritos"})
    }
})

router.get("/carts/:cartId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const getCartById = await cartService.getProductsInCart(cartId)
        console.log(getCartById)
        // res.render("carts",{getCartById})
    } catch (error) {
        res.render("carts",{error:"No es posible visualizar el carrito"})
    }
})

export {router as viewsRouter}