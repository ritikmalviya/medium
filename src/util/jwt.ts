import jwt, { verify } from 'jsonwebtoken'
import {User} from '../entities/User'

const JWT_SECRET="some-string-which-i-change-later"

export async function sign(user: User):Promise<string> {
    return new Promise((resolve,reject)=>{
        jwt.sign({
            username: user.username,
            email:user.email
        },JWT_SECRET,(err:any,encoded:string | undefined)=>{
           if(err) return reject(err)
           else{
               resolve(encoded as string)
           } 
        })
    })
}

export async function decode(token: string): Promise<User> {
    return new Promise((resolve,reject) => {

        jwt.verify(token,JWT_SECRET,(err: any,decoded: object | undefined )=>{
           if(err) return reject(err)
           else return resolve(decoded as User)
        })
    })    
}

// just testing thing
// async function run() {
//     const token = await sign({email:'ritik@mail.com', username:'shakti'})
//     console.log("this JWT token ",token)
//     const decodeds = await decode(token)
//     console.log(decodeds)

// }

// run()