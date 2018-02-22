let mongoose = require('mongoose');

// Article Schema
let recipeSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  steps:{
    type: String,
    required: true
  },
  serving:{
    type: Number,
    required: true
  },
  preptime:{
    type: Number,
    required: true
  },
  author:{
    type: String,
    required: true
  },

  ingredients:{
    type: [String],
    required: true
  }
});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);