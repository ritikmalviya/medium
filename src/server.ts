import express from 'express'
import { AdvancedConsoleLogger, Connection, createConnection } from 'typeorm';
import { Article } from './entities/Article';
import { User } from './entities/User';
import { userRoute } from './routes/user';
import { usersRoute } from './routes/users';


const app = express()
app.use(express.json())
app.use('/api/user',userRoute)
app.use('/api/users',usersRoute)


app.get('/', (req,res)=>{
    res.send("Hello World")
})


async function start() {
    await createConnection({
        type:"postgres",
        username:"medium",
        password:"medium",
        database:"medium",
        entities:[Article,User],
        dropSchema:true,
        synchronize:true,
        logging:true,
        logger:"advanced-console"

    })    
    app.listen(3232,()=>{
        console.log('server started on http://127.0.0.1:3232');
    })
}
start();