import { Router } from "express";
import { UsersMongo } from "../managers/Mongo/usersMongo.js";

const router = Router()
const usersService = new UsersMongo()

router.post("/signup",async(req,res)=>{
    try {
        const signupForm = req.body
        //Verificar si el usuario ya se registro
        const user = await usersService.getByEmail(signupForm.email)
        if(user){
            res.render("signup",{error:"El usuario ya esta registrado"})
        }
        if(signupForm.email === "adminCoder@coder.com" && signupForm.password === "adminCod3r123"){
            signupForm.role = "admin"
        }else{
            signupForm.role = "usuario"
        }
        const result = await usersService.save(signupForm)
        res.render("login",{message:"Usuario registrado"})
    } catch (error) {
        res.render("signup",{error:error.message})
    }
})

router.post("/login",async(req,res)=>{
    try {
        const loginForm = req.body
        //Verificar si el usuario ya se registro
        const user = await usersService.getByEmail(loginForm.email)
        if(!user){
            return res.render("login",{error:"No se encontro el usuario"})
        }
        //Si el usuario existe, hay que volidar la contraseña
        if(user.password === loginForm.password){
            req.session.userInfo = {first_name:user.first_name,role:user.role}
            res.redirect("/products")
        }else{
            return res.render("login",{error:"La contraseña es incorrecta"})
        }
    } catch (error) {
        res.render("login",{error:error.message})
    }
})

router.get("/logout",async(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.render("profile",{user:req.session.userInfo,message:"No se pudo cerrar la sesion"})
        res.redirect("/")
    })
})

export {router as sessionsRouter}