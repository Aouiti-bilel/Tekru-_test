const express = require('express');
const { validName, validfamiy_name, validPassword } = require('./validation')
const { validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
const auth = require('./auth')

//@route      POST /add
//@desc       Create new user
//@access     Public

    router.post('/register',[validName, validPassword,validfamiy_name], async(req, res)=> {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array() })
        }
        const { name,famiy_name, pass } = req.body   
            try {
                let user = await User.findOne({ where: {name: name} })        
                if(user){
                    return res.status(400).json({ msg: 'User Already Exists'});
                }
                const salt = await bcrypt.genSalt(10) 
                password = await bcrypt.hash(pass, salt)
                const last_login = Date.now()
                let newUser = await User.create({name, famiy_name, password, last_login  })
                return res.status(200).json(newUser)
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error')
            }
    });

//@route      POST /login
//@desc       Login user
//@access     Public
    router.post('/login',[validName, validPassword], async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array() })
        }
        const { name,famiy_name, pass } = req.body   
        try {
            let user = await User.findOne({ where: {name: name} })
            if(!user){
                return res.status(400).json({msg: 'Invalid Name'});
            } 
            const isMatch  = await bcrypt.compare(pass, user.dataValues.password)
            if(!isMatch){
                return  res.status(400).json({ msg : 'Invalid password'})
            }
           
                await User.update(
                {
                    last_login:  Date.now()
                 },
                 { where: {id: user.id} }
                 
                 )
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
                    return res.status(200).json({ token, user: [payload.user]})
                }
                )
                
    } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    });

//@route     GET /current
//@desc      Return Current User
//@acces     Private

router.get('/current', auth, async(req, res)=>{
    const userID =  req.user.id
    let user = await User.findAll({ where: {id: userID} })
    try {
        if(!user){
            return  res.status(404).json({msg: 'what are You Doing this is very  Danger :o  :p'})
        }
        res.status(200).json(user);
             
         
    } catch (error) {
        res.status(500).send('Server Error !!!')
    }   
    });

                                         //   *********************          CRUD OPERATIONS         ***************************************

//@route      GET /all
//@desc       Get ALl users
//@access     Private

    router.get('/all',async(req, res)=>{
        let users = await User.findAll()
        try {
           if(users.length ==0){
            return   res.status(400).json({ msg: 'There Is No User'})
           } 
           res.status(200).json(users)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })
//@route      GET /user/:id
//@desc       Get  user By ID
//@access     Private
    router.get('/user/:id',auth,  async(req, res)=>{
        const userID =  req.params.id
        let user = await User.findAll({ where: {id: userID} })
        try {
           if(user.length ==0){
            return   res.status(400).json({ msg: 'There Is No User For This ID'})
           } 
           res.status(200).json(user)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })

    
//@route      GET /user/:id
//@desc       Get  user By ID
//@access     Private
    router.get('/user/:id',auth,  async(req, res)=>{
        const userID =  req.params.id
        let user = await User.findAll({ where: {id: userID} })
        try {
           if(user.length ==0){
            return   res.status(400).json({ msg: 'There Is No User For This ID'})
           } 
           res.status(200).json(user)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })

//@route      PUT /user/:id
//@desc       Update  user By ID
//@access     Private   
    router.put('/user/:id',auth,[validName,validfamiy_name],  async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array() })
        }
        const userID =  req.params.id
        const { name,famiy_name } = req.body   
        let verifyName = await User.findOne({ where: {name: name} })

        try {

           if(verifyName){
            return   res.status(400).json({ msg: 'This Name Already Exist' })
           }
           let updatedUser = await User.update(
            {
               name: name,
               famiy_name: famiy_name,
             },
             { where: {id: userID} }
             
             )
           if(!updatedUser[0]){
            return   res.status(400).json({ msg: `we can not update ${name} information` })
           } 
           let user = await User.findOne({ where: {id: userID}})
           res.status(200).json(user)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })
//@route      DELETE /user/:id
//@desc       Delete  user By ID
//@access     Private      
    router.delete('/user/:id',auth,  async(req, res)=>{
        const userID =  req.params.id
        let rowDeleted  = await User.destroy({ where: {id: userID} })
        console.log(rowDeleted)
        try {
           if(!rowDeleted){
            return   res.status(400).json({ msg: 'We Can not  Delete This User'})
           } 

           res.status(200).json({msg: 'User Deleted successfully'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })



module.exports = router