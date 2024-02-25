require('dotenv').config()
const connection = require('./db/connection')
const express = require('express')
const routes = require('./routes')
const { createError } = require('./utils/error')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000'],
}))
app.use('/api', routes)


//* Catch HTTP 404
app.use((req, res, next) => {
    next(createError(404));
  });
  
  //* Error Handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });
  

const port = 8000 || process.env.PORT

app.listen(port, () => {
    connection()
    console.log(`Server is up at port ${port}`
)})