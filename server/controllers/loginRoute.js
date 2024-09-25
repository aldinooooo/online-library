const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const User = require('../models/user')

const loginUser = async(req,res)=>{
    const {username,password} = req.body

    //simple validation
    if(!username || !password){
        return res.status(400).json({
            message:'Please enter all fields'
        })
    }
    try {
        //check for existing user
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message:'User does not exist'
            })
        }
        //validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }
        //create JWT
        const token = jwt.sign(
            { id:user._id,role:user.role,},
            process.env.JWT_SECRET,
            {expiresIn:'1h'})
        res.json({
            token,
            user:{
                id:user._id,
                username:user.username,
                role:user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            message:'Server error'
        })
    }
}
module.exports = loginUser