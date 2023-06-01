import { getUserByEmail, createUser } from '../db/users'
import express, { response } from 'express'
import { random, authentication } from "../helpers"

const login = async (req: express.Request, res:express.Response)=>{
    const {email, password} = req.body
    if (!email || !password) {
        return res.sendStatus(400)
    }

    const existingUser = await getUserByEmail(email).select('+authentication.salt +authentication.password')

    if (!existingUser) {
        return res.sendStatus(400)
    } 
    const existHash = authentication(existingUser.authentication.salt, password)

    if (existingUser.authentication.password !== existHash) {
        return res.sendStatus(403)
    }

    const salt = random()
    existingUser.authentication.sessionToken = authentication(salt, existingUser._id.toString())
    await existingUser.save()

    res.cookie('sessionToken', existingUser.authentication.sessionToken, {domain:'localhost', path: '/' })
    return res.status(200).json(existingUser).end()
}

const register = async (req: express.Request, res: express.Response)=>{
    try {
        const {name, email, password} = req.body

        if (!email || !password || !name) {
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.sendStatus(400)
        } 

        const salt = random()
        const user = await createUser({
            name, 
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export {
    register,
    login
}