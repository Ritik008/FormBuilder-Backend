const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fields: [
        {
          type: {
            type: String,
            enum: ['text', 'checkbox', 'radio', 'dropdown'],
          },
          label: {
            type: String,
          },
          placeholder: {
            type: String,
          },
          options: [String]
        }
      ],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
},{
  timestamps: true
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;