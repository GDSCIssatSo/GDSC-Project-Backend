const User = require("../models/User")
var express = require("express");
var router = express.Router();
const _ = require('lodash')


router.get("/", async (req, res)=> {
        res.send(await User.find());
}) 


router.get("/:id", async (req, res) => {
    try{
        const user= await User.findById(req.params.id);
      
        if(!user)
          res.status(404).send("user not found.")
       
       res.send(user)
    }
    catch(ex){
      res.status(400).send(ex.message)
    }
}) 


router.delete("/:id", async  (req, res) => {
  
    try {
        const user = await User.findByIdAndremove(req.params.id);
        
        if (!user)
           return res.status(404).send("This ID does not belong to any user");
        
        res.send("user deleted with succes")   

    }catch(ex){
        
        res.status(400).send(ex.message)
    }
  
}) 


router.post("/", async (req, res) => {
    try{

        let user = await User.findOne({email :req.body.email});
        if (user)
           return res.status(400).send("User already registred");

        user = new User(_.pick(req.body,[
            'username','email','password','firstName','lastName','role',
            'adress','phoneNumber','gender','birthDate','avatar'
        ]))

        const result =await user.save();
        res.send(user)
    }
   catch(ex){
       
     res.status(400).send(ex.message);

   }
}) 


router.put("/:id", async (req,res) =>{
     try{       
      
        const user = await User.findByIdAndUpdate(req.params.id,_.pick(req.body,[
        'username','email','password','firstName','lastName','role',
        'adress','phoneNumber','gender','birthDate','avatar'
         ]));
      
        if (!user)
          res.status(404).send("This ID does not belong to any user")

        res.send("User updated with succes")
    
    }catch(ex){
        res.status(400).send(ex.message)
     }
})



module.exports = router;