import express from 'express';
const router = express.Router();

router.use('/', (req,res)=>{res.send('hello')});
router.use('/login', ()=>{});
router.use('/regisgter', ()=>{});

module.exports = router;
