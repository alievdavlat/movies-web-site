import userModel from '../models/user.model.js'
import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.handler.js'
import {toeknGenerator} from '../utils/tokenGenerator.js'


export default  {
signUp: async ( req , res ) => {
   try {
    const { username, password, displayName } = req.body;

    const checkUser = await  userModel.findOne({username})

    if (checkUser) return responseHandler.badRequest(res, 'Username already used')

    const user =  new userModel()

    user.displayName  = displayName
    user.username = username 
    user.setPassword(password)

    await user.save();
    
    const token = toeknGenerator({data: user.id})


    responseHandler.created(res, {
      token,
      ...user._doc,
      id:user.id
    })


   } catch (err) {
    responseHandler.error(res)
   }
},

signIn: async (req , res ) => {
  try {
    const { username, password } = req.body

    const user =  await userModel.findOne({username}).select('username password salt id displayName')


    if(!user) return responseHandler.badRequest(res, 'User not exist')

    if(!user.validPassword(password)) return  responseHandler.badRequest(res, 'Wrong password')

    
    const token = toeknGenerator({data:user.id})


    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id:user.id
    })



  } catch (err) {
    responseHandler.error(res)
  }
}



}