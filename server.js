const express = require('express');

const app  = express();

const User  = require('./UserModel')
app.use(express.json({ extended: false })); 
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
    next()
})
const PORT = process.env.PORT || 5000
User.sync().then( result => {
    console.log(result)
    app.listen(PORT, ()=> console.log(` server Run On Port ${PORT}`))
})
.catch(err => console.log('err'))
