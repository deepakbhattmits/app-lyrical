const express = require('express')
const models = require('./models')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')
require('dotenv').config()
const app = express()

const { DB_USER, DB_NAME, DB_PWD } = process.env

// Replace with your mongoDB URI
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.lyu47.mongodb.net/${DB_NAME}`
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo URI')
}
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Connected to MongoDB instance')
  })
  .catch((err) => {
    console.log('Error : ', err)
  })

// mongoose.Promise = global.Promise
// mongoose.connect(MONGO_URI)
// mongoose.connection
//   .once('open', () => console.log('Connected to MongoLab instance.'))
//   .on('error', (error) => console.log('Error connecting to MongoLab:', error))

app.use(bodyParser.json())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)

const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
app.use(webpackMiddleware(webpack(webpackConfig)))

module.exports = app
