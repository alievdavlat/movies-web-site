import responseHandler from '../handlers/response.handler.js'
import tmdbApi from '../tmdb/tmdb.api.js'
import userModel from '../models/user.model.js'
import reviewModel from '../models/review.model.js'
import tokenMiddleware from '../middlewares/token.middleware.js'
import favoriteModel from '../models/favorite.model.js'

export default {
  getList: async (req, res) => {
    try {
      const {page} = req.query
      const {mediaType, mediaCategory} = req.params

      const response = await tmdbApi.mediaList({mediaType, mediaCategory, page})
      

      return responseHandler.ok(res, response)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  getGenres: async (req, res) => {
    try {
      
      const { mediaType } = req.params

      const response = await tmdbApi.mediaGenres({mediaType})

      return responseHandler.ok(res, response)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  search: async (req, res) => {
    try {
      const { mediaType } = req.params

      const { query, page } = req.query

      const response = await tmdbApi.mediaSearch({query, page, mediaType:mediaType === 'peaple' ? 'person' : mediaType})


      responseHandler(res, response)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  getDetail: async (req, res) => {
    try {
      const { mediaType, mediaId } = req.params
      const media = await tmdbApi.mediaDetail({mediaType, mediaId})

      media.credits = await tmdbApi.mediaCredits({mediaType,mediaId })

      const videos = await tmdbApi.mediaVideos({mediaType, mediaId})

      media.videos = videos
      const recommend = await tmdbApi.mediaRecommend({mediaType, mediaId})

      media.recommend = recommend.results 

      media.images = await tmdbApi.mediaImages({mediaType, mediaId})

      const tokenDecoded = tokenMiddleware.tokenDecode(req)

      if (tokenDecoded) {
          const user = await userModel.findById(tokenDecoded.data)

          if (user) {
              const isFavorite  = await favoriteModel.findOne({user: user.id, mediaId})

              media.isFavorite = isFavorite !== null
          }
        }

        media.reviews =  await reviewModel.find({medaId}).populate('user').sort('-createdAt')

        responseHandler.ok(res, media)

    } catch (err) {
      responseHandler.error(res)
    }
  }


}


