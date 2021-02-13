const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('server is up and running')
})
router.get('/abctest',(req,res)=>{
    res.send('abctest')
})
module.exports = router;