import express from 'express'
import personController from '../../controllers/person.controller.js'


const person  = express.Router({mergeParams:true})



person.get('/:person/:medias', personController.personMedias)


person.get('/:personId', personController.personDetails)


export default person