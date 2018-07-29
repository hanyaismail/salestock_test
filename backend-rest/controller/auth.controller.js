const passport = require('passport');
const User = require('../model/User');
const Helper = require('../Helper/helper');

module.exports.register = async function(req, res){
    
    try {
        let [user] = await User.find({email: req.body.email})

        if(user) {
            return Helper.response(res, code=400, success=false, data=[], message="Email already exist")
        }

        const newUser = new User({
            email: req.body.email,
            name: req.body.name
        })
    
        newUser.setPassword(req.body.password)
    
        let newUserSave = await newUser.save()
        let token = await newUser.generateJwt()
        console.log(newUserSave)

        data = [{
            user: newUserSave,
            token: token
        }]
        
        return Helper.response(res, code=200, success=true, data=data, message="User created")
    } catch (err) {
        return Helper.response(res, code=400, success=false, data=[], message=err.message)
    }
}

module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        let token

        if (err) {
            res.status(404).json(err);
            return;
        }

        if(user){
            token = user.generateJwt();
            let data = []
            detail = {
                user: user,
                token: token
            }
            data.push(detail)
            return Helper.response(res, code=200, success=true, data=data, message="Auth success")
        } else {
            return Helper.response(res, code=401, success=false, data=[], message=info.message)
        }
    })(req, res);
}