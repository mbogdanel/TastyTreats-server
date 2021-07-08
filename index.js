const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const InquiriesModel = require('./models/CustomerInquiry.js')

app.use(express.json())
app.use(cors())

mongoose.connect(
  'mongodb+srv://marius020787:marius020787@cluster0.hh7ko.mongodb.net/bakery?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.post('/insert', async (req, res) => {
  const name = req.body.name
  const emailAddress = req.body.emailAddress
  const message = req.body.message
  const subscribed = req.body.subscribed

  const inquiry = new InquiriesModel({
    name: name,
    emailAddress: emailAddress,
    message: message,
    subscribed: subscribed,
  })

  try {
    await inquiry.save()
    res.send('data inserted')
  } catch (error) {
    console.log(error)
  }
})

app.get('/read', async (req, res) => {
  InquiriesModel.find({}, (error, result) => {
    if (error) {
      res.send(err)
    }
    res.send(result)
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on port 3001')
})
