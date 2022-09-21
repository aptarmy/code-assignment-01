const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const taskRouter = require('./routers/tasks');
const categoryRouter = require('./routers/categories');
const httpResponse = require('./helpers/httpResponse')

const port = process.env.PORT

app.use(bodyParser.json())
app.get('/', async (req, res) => {
  httpResponse.success({ res, data: { message: 'app is running' } })
})

app.use("/api/tasks", taskRouter)
app.use("/api/categories", categoryRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})