const mongoose = require("./mongoose");
const User = require("./user");

const blogSchema = new mongoose.Schema({
  url: String,
  title: String,
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


blogSchema.pre('deleteOne', { document: true }, async function () {
  await User.updateOne(
    { _id: this.author },
    { $pull: { blogs: this._id } }
  )
})

module.exports = mongoose.model("Blog", blogSchema);