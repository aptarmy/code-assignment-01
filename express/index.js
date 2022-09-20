const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const { Task, Category } = require('./models')
const httpResponse = require('./helpers/httpResponse')
const taskInputChecker = require('./helpers/taskInputChecker');

const port = 3000

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  httpResponse.success({ req, data: { message: 'app is running' } })
})

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll()
    httpResponse.success({ res, data: categories })
  } catch(err) {
    console.error('Error while getting categories:', err)
    return httpResponse.serverError({ res, message: 'Error while getting categories' })
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: Category })
    httpResponse.success({ res, data: tasks })
  } catch(err) {
    console.error('Error while getting categories:', err)
    return httpResponse.serverError({ res, message: 'Error while getting categories' })
  }
})

app.post('/tasks', async (req, res) => {
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

app.put('/tasks/:taskId', async (req, res) => {
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

app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  // check for input errors
  if(isNaN(parseInt(taskId))) { return httpResponse.badRequest({ res, message: 'taskId is invalid' }) }

  try {
    Task.destroy({ where: { TaskID: taskId } })
  } catch(err) {
    console.error('Error while deleting Task:', err)
    return httpResponse.serverError({ res, message: 'Error while deleting Task' })
  }

  httpResponse.success({ res, data: { taskId } })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})