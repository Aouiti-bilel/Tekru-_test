const express = require('express');

const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
const auth = require('./auth')

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

                                         //   *********************          CRUD OPERATIONS         ***************************************

    //@route      GET /all
    //@desc       Get ALl users
    //@access     Private

    router.get('/all',auth,  async(req, res)=>{
        let users = await User.findAll()
        try {
           if(!users){
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

    
    router.put('/user/:id',auth,  async(req, res)=>{
        const userID =  req.params.id
        const { name,famiy_name } = req.body   
        let updatedUser = await User.update(
         {
            name: name,
            famiy_name: famiy_name,
          },
          { where: {id: userID} }
          
          )
        try {
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

           res.status(200).json({ùsg: 'User Deleted successfully'})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal Server Error ')
        }
    })



module.exports = router