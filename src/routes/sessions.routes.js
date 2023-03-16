import {Router} from "express"
import usersDao from "../daos/users.dao.js"
import { comparePassword } from "../../utils.js"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/login", async (req,res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({error: "Email and Password are required"})
    }

    const user = await usersDao.getByEmail(email)

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    if (!comparePassword(user,password)) {
        return res.status(401).json({error: "Incorrect Password"})
    }

    const token= jwt.sign({ email, password, role: user.role }, "coderSecret",{expiresIn: "5m"} )
    res.cookie("coderCookieToken", token, { maxAge: 5000, httpOnly:false})
    res.json({message: "Correct Login", token})
})

export default router
//ruta sesiones que contiene el login