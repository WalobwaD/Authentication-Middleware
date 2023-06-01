import express from "express"
import {getUsers, deleteUser} from "../db/users"

const getAllUsers = async (req: express.Request, res: express.Response)=>{
    try {

        const users = await getUsers()
        
        return res.status(200).json(users).end()
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const DeleteUser = async(req: express.Request, res:express.Response)=>{
    try{

        const { id } = req.params

        const deletedUser = await deleteUser(id)
        return res.json(deletedUser)
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export {
    getAllUsers,
    DeleteUser
}