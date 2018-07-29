const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');

// const {to} = require('await-to-js');
// const pe = require('parse-error');

// module.exports.to = async (promise) => {
//     let err, res;
//     [err, res] = await to(promise);
//     if(err) return [pe(err)];

//     return [null, res];
// };

// module.exports.ReE = function(res, data=[], code, message=''){ // Error Web Response
    // let semd_data = {
    //     success: false,
    //     data: data,
    //     message: message
    // }

//     if(typeof err == 'object' && typeof err.message != 'undefined'){
//         err = err.message;
//     }

//     if(typeof code !== 'undefined') res.statusCode = code;

//     return res.json({success:false, error: err});
// };

const response = function(res, code, success, data=[], message='', meta={}){ // Success Web Response
    let send_data = {
        success: success,
        data: data,
        message: message,
        meta: meta
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};
module.exports.response = response

// Verify Tokenhelper
const verifyToken = function (req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // CHeck if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        console.log(bearerHeader)
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, jwtKey, (err, authData) => {
            if (err) {
                console.log('err')
                return response(res, code=403, success=false, data=[], message="Unauthorization")
            } else {
                req.auth_data = authData
            }   
        })
        next();
    } else {
        console.log(bearerHeader)
        return response(res, code=403, success=false, data=[], message="Unauthorization")
    }
}
module.exports.verifyToken = verifyToken


module.exports.TE = TE = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};

