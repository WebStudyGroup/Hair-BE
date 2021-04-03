import express from 'express';
import { register, login } from '@controllers/auth'
const router = express.Router();

router.get('/', (req, res)=> {res.send("auth")})
router.post('/register', register)
router.post('/login', login)


module.exports = router;
