const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs')
const session = require("express-session")

//register endpoint
router.post('/signup', async (req,res)=> {
   const confirm = await User.find({Username : req.body.username ,email : req.body.email,lastname: req.body.lastname,firstname: req.body.firstname})
    confirm && res.status(400).json('this user or email exist');
    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

const savedPost =  new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass   

})
     const resultPost = await savedPost.save();
     res.status(200).json(resultPost);
  } catch (error) {
     res.status(500).json(error); 
  }
})




//login endpoint
router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({username : req.body.username});
        !user && res.status(400).json('wrong user');

    const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json('wrong password');

        const {password, ...others} = user._doc;

        res.status(200).json(others);


    } catch (error) {
       res.status(500).json(error); 
    }
})
// logout endpoint
router.get('/logout',  function (req, res, next)  {
    // If the user is loggedin
    if (req.session.loggedin) {
          req.session.loggedin = false;
          res.redirect('/');
    }else{
        // Not logged in
        res.redirect('/');
    }
});


module.exports = router; 