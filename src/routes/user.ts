import { Router } from "express";

const route = Router();

route.get('/',(req,res)=>{
    res.send('get is working')
})

export const userRoute = route;