import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookierParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './routers';

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

