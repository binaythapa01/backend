const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    //console.log(req.headers.authorization);
    let authHeader= req.headers.authorization;
    if(!authHeader) {
        let err = new Error('No authorization information');
        err.status = 401;
        return next(err);

    }
    let token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err){
            let err = new Error('Token could not verified');
            return next(err);
        }
        req.user = payload;
        next();

        
    })

}

module.exports = verifyUser;