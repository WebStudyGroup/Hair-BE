import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: true
}).then(()=> console.log('mongoDB connect'))
  .catch(err => console.log(err))