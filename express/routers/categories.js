const app = require('express')
const cateogryRouter = app.Router()

const httpResponse = require('../helpers/httpResponse')
const { Category } = require('../models')

cateogryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll()
    httpResponse.success({ res, data: categories })
  } catch(err) {
    console.error('Error while getting categories:', err)
    return httpResponse.serverError({ res, message: 'Error while getting categories' })
  }
})

module.exports = cateogryRouter;