const mongoose = require('mongoose')

const InquiriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subscribed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Inquiries = mongoose.model('Inquiries', InquiriesSchema)
module.exports = Inquiries
