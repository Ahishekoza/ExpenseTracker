import userModel from "../models/userModel.js";

export const registerUser =async(req,res) => {

    const {name,email,password} = req.body

    await userModel.create({name:name,email:email,password:password}).then((response)=>{
        
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message:`Unable to register user ${err.message}`
        })
    })

}

export const loginUser = async(req,res) => {
    const {email,password} = req.body

    await userModel.findOne({ email: email}).then((user)=>{

        if(password === user.password) {
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                User: user
            })
        }


        else{
            return res.status(401).json({
                message: "Invalid password"
            })
        }


    }).catch((err) => {
        return res.status(400).json({
            success: false,
            message: `Unable to login ${err.message}`
        })
    })
}

