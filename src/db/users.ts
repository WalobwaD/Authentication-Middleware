import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    authentication : {
        password: {type: String, required: true, select:false},
        salt : {type: String, select: false},
        sessionToken : {type: String, select: false}
    }
})

const UserModel = mongoose.model('User', UserSchema)

const getUsers = ()=>{
    return UserModel.find()
}

const getUserByEmail = (email:string)=>{
    return UserModel.findOne({ email })
}

const getUserBySessionToken = (sessionToken:string)=>{
    return UserModel.findOne({ "authentication.sessionToken": sessionToken})
}

const getUserId = (id: string)=>{
    return UserModel.findById(id)
}

const createUser = (values: Record<string, any>) =>{
    return new UserModel(values).save()
    .then((user)=>user.toObject())
}
const deleteUser = (id :string)=>{
    return UserModel.findByIdAndDelete({_id: id})
}

const updateUserById = (id: string, values: Record<string, any>)=>{
    return UserModel.findByIdAndUpdate(id, values)
}

export {
    UserModel,
    getUsers,
    getUserByEmail,
    getUserBySessionToken,
    getUserId,
    createUser,
    deleteUser,
    updateUserById
}