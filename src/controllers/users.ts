import { sign } from "../util/jwt";
import { EntityRepository, getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashPassword, matchPassword } from "../util/password";
import { sanitizeFields } from "../util/security";

interface UserSignupData{
    email:string,
    username:string,
    password:string
}
interface UserLoginData{
    email:string,
    password:string
}
export async function createUser(data: UserSignupData) {
    
    //check for data validity
    if(!data.username) throw new Error("username is blank")
    if(!data.email) throw new Error("email is blank")
    if(!data.password) throw new Error("password is blank")
 
//check if user exist or n ot
    const repo = await getRepository(User)

    const  existing =await repo.findOne(data.email)

    if(existing) throw new Error("User with this email exists")
    
//create user and send back
    try{
        const user = await repo.save(new User(
            data.email,
            data.username,
            await hashPassword(data.password)            
        ))
        console.log(sanitizeFields(user))
        // return user

        // const user = new User()
        //     user.username = data.username,
        //     user.email = data.email,
        //     user.password = await hashPassword(data.password)
        //     await getRepository(User).save(user)
        //     console.log(sanitizeFields(user))    
            user.token=await sign(user);    
        return sanitizeFields(user)
        } catch(e){
        // console.error(e);
        throw e
    }
}
export async function loginUser(data:UserLoginData):Promise<User> {
    //check for data validity
    if(!data.email) throw new Error("email is blank")
    if(!data.password) throw new Error("Password is blank")

    const repo = getRepository(User)
    
    // Check if Email exists
    const user = await repo.findOne(data.email)
    if(!user) throw new Error('No User with this email id')

    //check if Password Matchs
    const passmatch =await matchPassword(user.password!,data.password);
    if(!passmatch) throw new Error('Wrong Password');
    
    user.token = await sign(user)
    return sanitizeFields(user)
    // return new Promise()
}