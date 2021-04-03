import express from 'express';
import helmet from 'helmet';
import cookierParser from 'cookie-parser';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db'
import routers from './routers';

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cookierParser())

app.use('/', routers);

const server = app.listen(process.env.PORT, ()=> {
  console.log(`⛳ Express Server Listening at http://localhost:${process.env.PORT}`);
})