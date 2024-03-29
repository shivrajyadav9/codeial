import User from '../../../models/user.js';
import jwt from 'jsonwebtoken';
import env from '../../../config/environment.js';


let createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'invalid username or password'
            })
        }
        return res.json(200,{
            message:'sign in successfull, here is yout token ,please keep it safe',
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'100000'})
            }
        })

    } catch (err) {
        console.log('Error', err);
        return res.json(500, {
            message: 'internal server error'
        })
    }
}

let usersApi={createSession};
export default usersApi;