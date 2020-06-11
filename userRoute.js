const express = require('express');

const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
//const auth = require('./auth')

    //@route      POST /add
    //@desc       Create new user
    //@access     Public

    router.post('/register', async(req, res)=> {
        //console.log(req.body)
        //name must Be Unique
        const { name,famiy_name, pass } = req.body   
            try {
                let user = await User.findOne({ where: {name: name} })
                
                if(user){
                    return res.status(400).json({ msg: 'User Already Exists'});
                }

                const salt = await bcrypt.genSalt(10) 
                password = await bcrypt.hash(pass, salt)

                let newUser = await User.create({name, famiy_name, password  })
                
                const payload = {
                    user: {
                        name: newUser.dataValues.name,
                        famiy_name: newUser.dataValues.famiy_name
                    }
                };     
                jwt.sign(
                    payload,
                    'thistextmustbeveryverysecret',
                    { expiresIn: 360000},
                    (err, token) =>{
                        if(err)throw err
                        res.json({ token })
                    }
                    );
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error')
            }
    });


    //@route      POST /login
    //@desc       Login user
    //@access     Public
    router.post('/login', async(req, res)=>{
        const { name,famiy_name, pass } = req.body   
        try {
            let user = await User.findOne({ where: {name: name} })
            console.log(pass +' !!!!!!!!!!!!!'+user.dataValues.password)
            if(!user){
                return res.status(400).json({msg: 'Invalid Name'});
            } 
            const isMatch  = await bcrypt.compare(pass, user.dataValues.password)
            if(!isMatch){
                return  res.status(400).json({ msg : 'Invalid password'})
            }
            
            const payload = {
                user: {
                    id: user.dataValues.id,
                    name: user.dataValues.name,
                    famiy_name: user.dataValues.famiy_name,
                }
            }
            jwt.sign(
                payload,
                'thistextmustbeveryverysecret',
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                }
                )
    } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    });

module.exports = router