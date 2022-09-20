const { Category } = require('../models')

module.exports.validator = async ({ taskName, categoryId, isCompleted }) => {
  // check for input errors
  if(typeof(taskName) !== "string" || !taskName.trim() || !taskName.replace(/[^a-zA-Z0-9\s]+/g, "").trim()) {
    const err = new Error('taskName is invalid')
    err.status = 400
    throw err
  }
  if(typeof(categoryId) !== "number") {
    const err = new Error('categoryId is invalid')
    err.status = 400
    throw err
  }

  let category
  try {
    category = await Category.findOne({ where: { CategoryID: categoryId } })
  } catch(error) {
    console.error('Error while fetching Category:', error)
    const err = new Error('Error while fetching Category')
    err.status = 500
    throw err
  }

  if(!category) {
    const err = new Error('Not found Category based on TaskCategory: ' + categoryId)
    err.status = 400
    throw err
  }

  if(isCompleted !== null && typeof(isCompleted) !== 'boolean') {
    const err = new Error('invalid isCompleted')
    err.status = 400
    throw err
  }

  // filter out unwanted characters
  taskName = taskName.replace(/[^a-zA-Z0-9\s]+/g, "").trim()

  return { taskName, categoryId, isCompleted }
}