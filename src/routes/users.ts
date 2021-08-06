import { Router } from "express";
import { createUser, loginUser } from "../controllers/users";

const route = Router();


route.post('/login',async (req,res)=>{
    try{
        const user = await loginUser(req.body.user)
        return res.status(200).json({user})
    }
    catch (e){
        // console.error(e);
        return res.status(422).json({
            errors:{body:['Login Failed',e.message]}
        })
    }
}
    )


route.post('/',async (req,res)=>{
    try{
        const user = await createUser({
            username: req.body.user.username,
            email: req.body.user.email,
            password: req.body.user.password
        })
        return res.send(user)
    }
    catch (e){
        console.error(e);
        return res.status(422).json({
            errors:{body:['could not create user',e.message]}
        })
    }
})

export const usersRoute = route;