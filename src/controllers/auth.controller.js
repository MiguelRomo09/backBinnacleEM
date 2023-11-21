// import User from '../models/user.model.js';
import bycrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import  jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { pool } from "../db.js";

export const register = async (req, res) => {
    const {email, password} = req.body;
    try {        
        const userFound = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if(userFound[0].length > 0){
            return res.status(400).json(["The email is alredy in use"])
        }
        const pswHash = await bycrypt.hash(password,10);
        
        const userSaved = await pool.query(
            "INSERT INTO users(email, psw, userType) VALUES (?, ?, ?)",
            [email, pswHash, 2]
          );

        res.json({
        id: userSaved[0].insertId,
        email,
        });
        

    } catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if(result[0].length == 0) return res.status(400).json(["user not found"]);
        const userFound = result[0][0];
        
        const isMatch = await bycrypt.compare(password, userFound.psw);
        if(!isMatch) return res.status(400).json(["Incorrect password"]);

        const token = await createAccessToken({id:userFound.id});
        res.cookie("token_binnacle",token);
        res.json({
            id:userFound.id,
            email : userFound.email,
            createdAt : userFound.createdAt,
            updatedAt : userFound.updatedAt,
            token:token,
        });

    } catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token_binnacle', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id:userFound._id,
        username: userFound.username,
        email : userFound.email,
        createdAt : userFound.createdAt,
        updatedAt : userFound.updatedAt
    })
}

export const verifyToken = async (req,res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json(["Unauthorized"]);

    jwt.verify(token, TOKEN_SECRET, async (err,user) => {
        if(err) return res.status(401).json(["Unauthorized"]);

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json(["Unauthorized"]);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};