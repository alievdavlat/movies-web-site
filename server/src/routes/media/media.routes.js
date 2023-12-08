import express from 'express'
import mediaController from '../../controllers/media.controller.js'

const media = express.Router({mergeParams: true})


media.get('/search', mediaController.search)

media.get('/genres', mediaController.getGenres)

media.get('/detail/:mediaId', mediaController.getDetail)

media.get('/:mediaCategory', mediaController.getList)


export default media
