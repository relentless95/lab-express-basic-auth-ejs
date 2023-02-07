const router = require('express').Router();

const User  = require('../models/User.model')

const bcrypt = require("bcryptjs")


router.get("/signup",  (req, res) => {
    res.render("signup");
  });

router.post("/signup", async(req,res)=>{
    const body={...req.body}
    console.log(body)
    const salt=bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(body.password, salt)
    console.log(passwordHash)

    delete body.passwordHash
    body.passwordHash = passwordHash

    try{
        console.log("working?")
        await User.create(body)
        res.send(body)
    }
    catch(error){console.log(error)}
})



module.exports = router;