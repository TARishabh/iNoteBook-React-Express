const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "RishabhSeKuchNahiHoga";
const fetchuser = require('../middleware/fetchuser')

router.post('/createuser',[
    body('email','').isEmail(),
    body('name','').isLength({'min':3}),
    body('password','').isLength({'min':5}),
    // body('email','email dhang se dede yaar').isEmail(),
    // body('name','Amma behan pe aajaaunga mein').isLength({'min':3}),
    // body('password','Tu Madarchod').isLength({'min':5}),

],async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        // const user = User(req.body);
        // user.save();
        // CHECK WHEATHER USER ALREADY EXISTS:
        let user = await User.findOne({email:req.body.email});
        if (user){
            return res.status(400).json({errors:'Email Already Taken'})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)

        user = await User.create({
            "name":req.body.name,
            // "password":req.body.password,
            password:secPass,
            "email":req.body.email,
        })
        const data = {
            user:{
                "id":user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        // console.log(jwtData)
        // res.json({"results":"Created Successfully"})
        // res.json(user);
        res.json({authToken})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({'error':"Something Went Wrong"})
    }
    // User.create({
    //     "name":req.body.name,
    //     "password":req.body.password,
    //     "email":req.body.email,
    // }).then(user => res.json(user))
    // .catch(err=>console.log(err))
    // res.json({error:'Please enter unique value for email'})
    // res.send(req.body)
    
})


router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','Password Can not be empty').exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({errors:'Wrong Credentials'})
        }
        
        const checkPassword = await bcrypt.compare(password,user.password)
        if (!checkPassword){
            return res.status(400).json({errors:'Wrong Credentials'})
        };
        const data = {
            user:{
                "id":user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken})
    } catch (error) {
        console.log(error);
        return res.status(500).json({errors:'Something went wrong'})
    }

})

router.post('/getuser',fetchuser,async (req,res)=>{
    const {email} = req.body;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({errors:'Something went wrong'})
    }
})

router.post('/getuserfromtoken',fetchuser,async(req,res)=>{
    const {token} = req.body
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user)
        // res.status(200).json({"hello":200})
    } catch (error) {
        console.log(error);
        res.status(500).json({errors:'Something went wrong'})
    }
})
module.exports = router