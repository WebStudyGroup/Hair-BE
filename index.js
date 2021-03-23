import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookierParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose'
import routers from './routers';


mongoose.connect('mongodb+srv://bluekmky:mIQAnlkhW5sErg7W@hairhair.fwzva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: true
}).then(()=> console.log('mongoDb connect'))
  .catch(err => console.log(err))

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(process.env.PORT, ()=> {
    console.log(`⛳ Express Server Listening at http://localhost:${process.env.PORT}`);
})

