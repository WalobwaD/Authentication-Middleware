import crypto from 'crypto';

const secret = 'Samaritan02'
const random = ()=>{
    return crypto.randomBytes(128).toString('base64')
}

const authentication = ( salt:string, password: string)=>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex')
}

export {
    random, authentication
}