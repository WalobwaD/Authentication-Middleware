import express from "express"
import { getUserBySessionToken } from "../db/users"
import {merge} from "lodash"

const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    try {

        const sessionToken = req.cookies['sessionToken']
        if (!sessionToken) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) {
            return res.sendStatus(400)
        }

        merge(req, {identity: existingUser})

        return next()
    } catch(error) {
        console.log(error)
        return res.sendStatus(400)
    }
} 

export {
    isAuthenticated
}