const {User,  validateUser}= require('../models/User')
const failureResponse = require('./../utils/failureResponse');
const successResponse = require('./../utils/successResponse');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Exception } = require('handlebars/runtime');



const getAllUsers = async (req, res)=> {
    const usersWithPass = await User.find();
    var users=[];
    usersWithPass.map(user =>{
        users.push(_.omit(JSON.parse(JSON.stringify(user)), ["password"]));
    })
    res.json({status: "Success", data : users});
}


const getUserById = async (req, res) => {
    try{
        const user= await User.findById(req.params.id);
        if(!user)
            return res.status(404).json(failureResponse({value: req.params.id, msg : "User id not found"}));       

        res.json(successResponse(user));      
    }
    catch(ex){
        res.json(failureResponse({msg : ex.message}));    
    }
}

const saveUser = async (req, res) => {
    try{
        let user = await User.findOne({email :req.body.email});
        if (user)
            return res.status(400).json(failureResponse({value: req.params.id, msg: "User already registred"}));

        user = new User(_.pick(req.body,[
              'username','email','password','firstName','lastName','role',
              'address','phoneNumber','gender','birthDate','avatar'
        ]))
 
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password,salt); 

        await user.save();
        res.status(201).json(successResponse(user));   
    }
    catch (ex){
        res.json(failureResponse({msg : ex.message}));
    }
    
}

const updateUser = async (req,res) =>{
    try{     

       const user = await User.findByIdAndUpdate(req.params.id,_.pick(req.body,[
       'username','email','password','firstName','lastName','role',
       'address','phoneNumber','gender','birthDate','avatar'
        ]));
     
       if (!user)
           return res.status(404).json(failureResponse({value: req.params.id, msg : "User id not found"}));  

       res.status(201).json(successResponse(user));
   }
   catch(ex){
       res.json(failureResponse({msg : ex.message}));  
    }
}

const deleteUser = async  (req, res) => {
    try {    
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user)
            return res.status(404).json(failureResponse({value: req.params.id, msg : "User id not found"})); 
        
        res.status(200).json(successResponse(user)); 
    }
    catch(ex){    
        res.json(failureResponse({msg : ex.message})); 
    }
  
}


module.exports = {getAllUsers, getUserById, saveUser, updateUser, deleteUser};