import userModel from '../models/user.model.js'
import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.handler.js'


export default  {

  updatePassword: async (req, res) => {
    try {
      const { password , newPassword } = req.body

      const user = await userModel.findById(req.user.id).select('password id  salt')

      if(!user) return responseHandler.unauthorize(res)

      if(!user.validPassword(password)) return responseHandler.badRequest(res, 'Wrong password')

      user.setPassword(newPassword)

      await user.save()

      responseHandler.ok(res)

    } catch (err) {
      responseHandler.error(res)
    }
  },

  getInfo: async (req, res) => {
    try {
      const user = await userModel.findById(req.use.id)

      if (!user) return responseHandler.notFound(res)


      responseHandler.ok(res, user)
      
    } catch (err) {
      responseHandler.error(res)
    }
  }

}