const { Schema, model } = require('mongoose');
const shortId = require('shortid');


const urlsSchema = new Schema({
  urlOriginal: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Agrega una URL'
  },
  urlCorta: String
});
// Metodos de mongoose
urlsSchema.pre('save', async function(next) {
  this.urlCorta = shortId.generate();
  next();
})


module.exports = model('Urls', urlsSchema)
