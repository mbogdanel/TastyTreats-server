const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fetch = require('node-fetch')
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

async function validateHuman(token) {
  const secret = '6LdqNoAbAAAAAEfM2yA56r2o7APhoOx63rmyJTnE'
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    }
  )
  const data = await response.json()
  return data.success
}

app.post('/insert', async (req, res) => {
  const name = req.body.name
  const emailAddress = req.body.emailAddress
  const message = req.body.message
  const subscribed = req.body.subscribed
  const token = req.body.token

  console.log(token)

  const human = await validateHuman(token)

  console.log(human)

  if (!human) {
    res.status(400)
    res.json({ errors: ['Go away, bot.'] })
    return
  }

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
