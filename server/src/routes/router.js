import { Router } from "express";
import auth from "./auth/auth.routes.js";
import user from "./user/user.routes.js";
import media from "./media/media.routes.js";
import person from './person/person.routes.js'
import review from './review/review.routes.js'

const mainRouter = Router()



mainRouter.use(auth)
mainRouter.use('/user', user)
mainRouter.use('/person', person)
mainRouter.use('/reviews', review)
mainRouter.use('/:mediaType', media)


export default mainRouter

 