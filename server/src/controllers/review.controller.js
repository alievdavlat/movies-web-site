import responseHandler from '../handlers/response.handler.js'
import reviewModel from '../models/review.model.js'



export default  {

  create: async (req ,res ) => {
    try {
      const { movieId } = req.params

      const review = new reviewModel({
        user: req.user.id,
        movieId,
        ...req.body
      })

      await reviewModel.save()

      responseHandler.created(res, {
        ...review,
        id:review.id,
        user:req.user
      })

    } catch (err) {
      responseHandler.error(res)
    }
  },

  remove: async (req, res) => {
    try {
      const { reviewId } = req.params

      const review = await reviewModel.findOne({
        _id:reviewId,
        user:req.user
      })

      if(!review) return responseHandler.notFound(res)

      await review.remove()

      responseHandler.ok(res)
    } catch (err) {
      responseHandler.error(res)
    }
  },

  getReviewOfUsers: async (req, res) => {
    try {
        
        const reviews = await reviewModel.find({
          user:req.user.id,
        }).sort('-createdAt')

        responseHandler.ok(res, reviews)

    } catch (err) {
      responseHandler.error(res)
    }
  }
}