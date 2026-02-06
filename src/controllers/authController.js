import { prisma } from "../config/db.js"
import bcrypt from 'bcryptjs'

const register = async (req,res)=>{
    
    const {name,email,password} = req.body

    const userExists = await prisma.user.findUnique({
        where:{email:email}
    }) 

    // check if user already exists
    if(userExists){
        return res.status(400).json({message:"User already exists"})
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // add new user to db
    const user = await prisma.user.create({
        data:{name,email,password:hashedPassword}
    })

    return res.status(201).json({message:"sucess",data:{id:user.id,name:user.name,email:user.email}})
}

export {register}