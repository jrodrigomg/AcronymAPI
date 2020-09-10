const expressJwt = require('express-jwt');
const config = require('../config.js');

module.exports = jwt;
function jwt() {
    const options = { 
        secret:config.secret_jwt_key,
        algorithms: ['HS256'] 
    }
    let jwtData = expressJwt(options).unless({
        path: [
            {url:"/", methods:['GET']},
            {url:/^\/acronym\/.*/,methods:['GET']},
            {url:/^\/random\/.*/,methods:['GET']},
            {url:"/acronym",methods:['GET','POST']},
            //solo por testing
            {url:"/token", methods:['GET']},

        ]
    });
    return jwtData 
}