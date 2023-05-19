const router = require("express").Router()
const User = require('../models/User.model')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
    res.json("Auth is ok")
})


//post to signup
router.post("/signup", async (req, res) => {
    // salt generated
    const salt = bcryptjs.genSaltSync(13)

    // password hashed
    const passwordHash = bcryptjs.hashSync(req.body.password, salt)

    try {
        await User.create({ email: req.body.email, password: passwordHash })
        res.status(201).json({ message: "new user in there !" })
    } catch (error) {
        console.log("there is an error in the post signup", error)

    }


})

//post to login
router.post('/login', async (req, res) => {
    //user exist or no ? 
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) //when user exist we check password 
    {
        if (bcryptjs.compareSync(req.body.password, existingUser.password)) {
            // this is what we do when password ok

        }
        else{

        }
    }

    // if user doest not exist
    else{

    }

})

//get to verify
module.exports = router