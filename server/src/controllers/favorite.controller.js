import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";


export default {
  addFavorite: async (req, res) => {
    try {
      const isFavorite = await favoriteModel.findOne({
        user:req.user.id,
        medaId:req.body.medaId
      })

      if(isFavorite) return responseHandler.ok(res, isFavorite)

      const favorite = await favoriteModel({
        ...req.body,
        user: req.user.id
      })

      await favoriteModel.save()

      responseHandler.created(res, favorite)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  removeFavorite: async (req, res) => {
    try {
      const { favoriteId }  = req.params
      
      const favorite = await favoriteModel.findOne({
        user:req.user.id,
        _id: favoriteId
      })

      if (!favorite)  return responseHandler.notFound(res)

      await favorite.remove()

      responseHandler.ok(res)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  getFavoritesOfusers: async (req, res) => {
    try {
      const favorite = await favoriteModel.find({user:req.user.id}).sort('-createdAt')

      responseHandler.ok(res, favorite)
    } catch (err) {
        responseHandler.error(res)
    }
  }
}

