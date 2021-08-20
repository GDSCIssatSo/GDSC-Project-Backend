const {User,  validateUser, validateUserId}= require('../models/User')
var express = require("express");
var router = express.Router();
const _ = require('lodash');



function failureResponse(error){
   const response = new Object();
   response.status="Failure";
   response.error = {message : error};
   return response;
}

function successResponse(user){
  const response = new Object();
  response.status="Success";
  response.data = user;
  return response;
}



router.get("/", async (req, res)=> {
    res.send(await User.find());
}) 

 
router.get("/:id", async (req, res) => {
    try{
        const {error} = validateUserId(req.params);
        if (error)
            return res.status(400).send(failureResponse(error.details[0].message));

        const user= await User.findById(req.params.id);
        if(!user)
            return res.status(404).send(failureResponse("User id not found - "+req.params.id));       
       
        res.send(successResponse(user));      
    }
    catch(ex){
        res.send(failureResponse( ex.message));    
    }
}) 




router.post("/", async (req, res) => {
    try{
        const {error} = validateUser(req.body);
        if (error)
            return res.status(400).send(failureResponse(error.details[0].message));

        let user = await User.findOne({email :req.body.email});
        if (user)
            return res.status(400).send(failureResponse("User already registred"));

        user = new User(_.pick(req.body,[
              'username','email','password','firstName','lastName','role',
              'adress','phoneNumber','gender','birthDate','avatar'
        ]))
 
        await user.save();
        res.send(successResponse(user));   
    }
    catch (ex){
        res.send(failureResponse( ex.message));  
    }
    
}) 


router.put("/:id", async (req,res) =>{
     try{     
        var {error} = validateUserId(req.params);
        if (error)
            return res.status(400).send(failureResponse(error.details[0].message));
      
        var {error} = validateUser(req.body);
        if (error)
            return res.status(400).send(failureResponse(error.details[0].message));

        const user = await User.findByIdAndUpdate(req.params.id,_.pick(req.body,[
        'username','email','password','firstName','lastName','role',
        'adress','phoneNumber','gender','birthDate','avatar'
         ]));
      
        if (!user)
            return res.status(404).send(failureResponse("User id not found - "+req.params.id));  

        res.send(successResponse(user));
    }
    catch(ex){
        res.send(failureResponse( ex.message));  
     }
})

 
router.delete("/:id", async  (req, res) => {
    try {
        const {error} = validateUserId(req.params);
        if (error)
            return res.status(400).send(failureResponse(error.details[0].message));

        const user = await User.findByIdAndRemove(req.params.id);
        if (!user)
            return res.status(404).send(failureResponse("User id not found - "+req.params.id)); 
        
        res.send(successResponse(user));   
    }
    catch(ex){    
        res.send(failureResponse( ex.message)); 
    }
  
}) 




module.exports = router;