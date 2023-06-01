import express from "express"
import {getUsers} from "../db/users"

const getAllUsers = async (req: express.Request, res: express.Response)=>{
    try {

        const users = await getUsers()
        
        return res.status(200).json(users).end()
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export {
    getAllUsers
}