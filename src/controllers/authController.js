import { prisma } from "../config/db.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"

// register controller
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

    // generate token
    const token = generateToken(user.id,res)

    return res.status(201).json(
        {
            message:"sucess",
            data:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            token
        }
    )
}

// login controller
const login = async(req,res)=>{
    const {email,password} = req.body

    // find user in db
    const user = await prisma.user.findUnique({where:{email:email}})

    // check if user no exists
    if(!user){
        return res.status(401).json({message:"Invalid email or password"})
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return  res.status(401).json({message:"Invalid email or password"})
    }

    // generate token
    const token = generateToken(user.id,res)

    return res.status(200).json({
        status:"success",
        data:{
            id:user.id,
            name:user.name,
            email:user.email
        },
        token
    })

}

const logout = (req,res)=>{
    res.cookie('jwt',"",{
        httpOnly:true,
        expires: new Date(0)
    })
    return res.status(200).json({
        status:"success",
        message:"Logged out successfully"
    })
}

export {register,login, logout}