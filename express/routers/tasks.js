const app = require('express')
const taskRouter = app.Router()

const { Task, Category } = require('../models')
const httpResponse = require('../helpers/httpResponse')
const taskInputChecker = require('../helpers/taskInputChecker');

taskRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: Category, order: [['TaskID', 'DESC']] })
    httpResponse.success({ res, data: tasks })
  } catch(err) {
    console.error('Error while getting categories:', err)
    return httpResponse.serverError({ res, message: 'Error while getting categories' })
  }
})

taskRouter.post('/', async (req, res) => {
  let { taskName, categoryId } = req.body
  console.log({ taskName, categoryId })

  // check for input error
  try {
    ({ taskName, categoryId } = await taskInputChecker.validator({ taskName, categoryId, isCompleted: null }));
  } catch(err) {
    switch(err.status) {
      case 400:
        return httpResponse.badRequest({ res, message: err.message })
      case 500:
        return httpResponse.serverError({ res, message: err.message })
      default:
        return httpResponse.serverError({ res, message: err.message })
    }
  }

  // add new task
  let task
  try {
    task = await Task.create({
      TaskName: taskName,
      TaskCategory: categoryId,
      TaskCompleted: false
    })
  } catch(err) {
    console.error('Error while creating Task:', err)
    return httpResponse.serverError({ res, message: 'Error while creating Task' })
  }

  // return response
  httpResponse.success({ res, data: task })
})

taskRouter.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  let { taskName, categoryId, isCompleted } = req.body

  // check for input error
  if(isNaN(parseInt(taskId))) { return httpResponse.badRequest({ res, message: 'invalid taskId' }) }
  try {
    ({ taskName, categoryId, isCompleted } = await taskInputChecker.validator({ taskName, categoryId, isCompleted }));
  } catch(err) {
    switch(err.status) {
      case 400:
        return httpResponse.badRequest({ res, message: err.message })
      case 500:
        return httpResponse.serverError({ res, message: err.message })
      default:
        return httpResponse.serverError({ res, message: err.message })
    }
  }

  // update in database
  let result;
  try {
    result = await Task.update({ TaskName: taskName, TaskCategory: categoryId, TaskCompleted: isCompleted }, { where: { TaskID: taskId } })
  } catch(err) {
    console.error('Error while updating task:', err)
    return httpResponse.serverError({ res, message: 'Error while updating Task' })
  }

  httpResponse.success({ res, data: { affectedCount: result[0] } });
})

taskRouter.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  // check for input errors
  if(isNaN(parseInt(taskId))) { return httpResponse.badRequest({ res, message: 'taskId is invalid' }) }

  try {
    await Task.destroy({ where: { TaskID: taskId } })
  } catch(err) {
    console.error('Error while deleting Task:', err)
    return httpResponse.serverError({ res, message: 'Error while deleting Task' })
  }

  httpResponse.success({ res, data: { taskId } })
})

module.exports = taskRouter;