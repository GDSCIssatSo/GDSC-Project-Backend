var express = require("express");
const {getAllUsers, getUserById, saveUser, updateUser, deleteUser} = require("../services/userService")
const requestValidationMiddle = require('../middlewares/RequestValidationMiddleware')
const { requestValidation } = require("../utils/RequestValidation");

var router = express.Router();

const validation = [ requestValidation.username,
                    requestValidation.email,
                    requestValidation.password,
                    requestValidation.firstName,
                    requestValidation.lastName,
                    requestValidation.role,
                    requestValidation.phoneNumber,
                    requestValidation.address,
                    requestValidation.birthDate,
                    requestValidation.gender];


router.get("/",getAllUsers);  
router.get("/:id", 
            requestValidation.userId,
            requestValidationMiddle,
            getUserById);

router.post("/",
            validation,
            requestValidationMiddle,
            saveUser);

router.put("/:id",
            requestValidation.userId,
            validation,
            requestValidationMiddle,
            updateUser);

router.delete("/:id",
            requestValidation.userId,
            requestValidationMiddle, 
            deleteUser); 


module.exports = router;